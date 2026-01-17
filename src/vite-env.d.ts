// src/vite-env.d.ts
/// <reference types="vite/client" />

// SVGR - SVG como React Component
declare module '*.svg?react' {
  import * as React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
