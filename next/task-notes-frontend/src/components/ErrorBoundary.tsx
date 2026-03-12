"use client"

import React, { Component, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by ErrorBoundary:", error)
  }

  render() {

    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-3xl rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-800 shadow-sm">
          <h2 className="text-base font-semibold text-red-900">
            Something went wrong.
          </h2>
          <p className="mt-1">
            Please refresh the page and try again.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}