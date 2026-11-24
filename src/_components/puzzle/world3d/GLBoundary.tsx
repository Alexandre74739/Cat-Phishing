"use client";

import { Component, type ReactNode } from "react";

type GLBoundaryProps = { fallback: ReactNode; children: ReactNode };

export class GLBoundary extends Component<
  GLBoundaryProps,
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
