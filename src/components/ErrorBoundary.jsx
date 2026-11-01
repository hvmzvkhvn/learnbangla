import { Component } from 'react'
export default class ErrorBoundary extends Component {
  state={failed:false}
  static getDerivedStateFromError(){return{failed:true}}
  render(){return this.state.failed?<main className="mx-auto max-w-xl p-6"><h1 className="text-2xl font-bold">This page could not open</h1><p className="my-4">Your saved progress is still on this device. If you are offline, reconnect once to download this section.</p><a className="btn-primary" href="/">Return to learning</a><button className="ml-4 underline" onClick={()=>location.reload()}>Try again</button></main>:this.props.children}
}
