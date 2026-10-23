// Supabase Edge Function: activate-parent
// Called from the parent activation page. Given a valid activation token, this:
//   1. Creates the parent's auth user + profile
//   2. Links the child's profile to the new parent and flips status: locked -> active
// Runs with the service role key so it can safely write across both profile rows.
//
// Requires the following secrets (set automatically for every Supabase project):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token, name, email, password } = await req.json()

    if (!token || !name || !email || !password) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Find the child profile matching this activation token
    const { data: childProfile, error: childError } = await supabaseAdmin
      .from('profiles')
      .select('id, name, status, role')
      .eq('activation_token', token)
      .eq('role', 'child')
      .maybeSingle()

    if (childError || !childProfile) {
      return new Response(JSON.stringify({ error: 'This activation link is invalid or has expired.' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (childProfile.status === 'active') {
      return new Response(
        JSON.stringify({ error: 'This account has already been activated. Please log in instead.' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 2. Create the parent auth user
    const { data: createdUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createUserError || !createdUser?.user) {
      return new Response(
        JSON.stringify({ error: createUserError?.message ?? 'Could not create parent account.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const parentId = createdUser.user.id

    // 3. Create the parent profile
    const { error: parentProfileError } = await supabaseAdmin.from('profiles').insert({
      id: parentId,
      name,
      email,
      role: 'parent',
      status: 'active',
    })

    if (parentProfileError) {
      // Roll back the auth user so we don't leave an orphaned account behind
      await supabaseAdmin.auth.admin.deleteUser(parentId)
      return new Response(JSON.stringify({ error: 'Could not create parent profile.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 4. Link the child to the new parent and activate their account
    const { error: updateChildError } = await supabaseAdmin
      .from('profiles')
      .update({
        status: 'active',
        parent_id: parentId,
        activation_token: null,
      })
      .eq('id', childProfile.id)

    if (updateChildError) {
      return new Response(JSON.stringify({ error: 'Could not activate the child account.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, childName: childProfile.name }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
