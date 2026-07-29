export interface IconDef {
  name: string
  d: string | string[]
  vb?: string
  fillRule?: string
  clipRule?: string
  sizes?: number[]
}

export interface IconGroup {
  id: string
  name: string
  description: string
  icons: IconDef[]
}

export declare const GROUPS: IconGroup[]
export declare const ICONS: Record<string, IconDef>
