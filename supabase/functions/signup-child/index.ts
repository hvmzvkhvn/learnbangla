// Supabase Edge Function: signup-child
// Creates a child's auth user + locked profile, then emails the parent an activation link.
// Runs with the service role key so the write doesn't depend on the child's own session
// or on the project's "confirm email" setting.
//
// Requires the following secrets:
//   SUPABASE_URL               (set automatically)
//   SUPABASE_SERVICE_ROLE_KEY  (set automatically)
//   RESEND_API_KEY             — API key from https://resend.com
//   EMAIL_FROM                 — verified "from" address, e.g. "Learn Bangla <hello@yourdomain.com>"

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
    const { name, age, email, password, parentEmail, siteOrigin } = await req.json()

    if (!name || !age || !email || !password || !parentEmail || !siteOrigin) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Create the child's auth user
    const { data: createdUser, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, age, role: 'child' },
    })

    if (createUserError || !createdUser?.user) {
      const message = createUserError?.message?.includes('already been registered')
        ? 'That email is already in use — try logging in instead.'
        : 'Oops, that didn\'t work — try again!'
      return new Response(JSON.stringify({ error: message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const childId = createdUser.user.id

    // 2. Create the locked child profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: childId,
        name,
        email,
        role: 'child',
        status: 'locked',
        parent_email: parentEmail,
      })
      .select('activation_token')
      .single()

    if (profileError || !profile) {
      await supabaseAdmin.auth.admin.deleteUser(childId)
      return new Response(JSON.stringify({ error: "Oops, that didn't work — try again!" }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 3. Email the parent an activation link
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? 'Learn Bangla <onboarding@resend.dev>'
    const activationLink = `${siteOrigin}/activate/${profile.activation_token}`

    if (RESEND_API_KEY) {
      const emailHtml = `
        <div style="font-family: Nunito, sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #1B7A7A;">⭐ ${name} wants to learn Bangla!</h1>
          <p style="color: #2D2D2D; font-size: 16px;">
            ${name} just signed up for Learn Bangla and needs a parent to activate their account.
          </p>
          <p style="color: #2D2D2D; font-size: 16px;">
            Click the button below to create your parent account and get ${name} started:
          </p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${activationLink}"
               style="background-color: #1B7A7A; color: #ffffff; padding: 16px 32px; border-radius: 16px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Activate ${name}'s Account
            </a>
          </p>
          <p style="color: #2D2D2D; font-size: 13px;">
            If you didn't expect this email, you can safely ignore it.
          </p>
        </div>
      `

      const emailRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [parentEmail],
          subject: `${name} wants to learn Bangla! Activate their account`,
          html: emailHtml,
        }),
      })

      if (!emailRes.ok) {
        console.error('Resend error:', await emailRes.text())
        // The account was created successfully — surface a soft warning but don't fail the signup.
        return new Response(
          JSON.stringify({
            success: true,
            warning: "Account created, but we couldn't send the email to your parent. Please ask them to check the link with you.",
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else {
      console.warn('RESEND_API_KEY not set — skipping parent activation email.')
    }

    return new Response(JSON.stringify({ success: true }), {
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
