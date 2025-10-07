export interface Schema {
  $id?: string
  $ref?: string
  $schema?: string
  title?: string
  description?: string

  type?:
    | 'string'
    | 'number'
    | 'integer'
    | 'boolean'
    | 'array'
    | 'object'
    | 'null'
    | string[]

  properties?: Record<string, Schema>
  required?: string[]
  additionalProperties?: boolean | Schema

  items?: Schema | Schema[]
  minItems?: number
  maxItems?: number
  uniqueItems?: boolean

  minLength?: number
  maxLength?: number
  pattern?: string

  minimum?: number
  maximum?: number

  enum?: (string | number | boolean | null)[]
  const?: any

  [key: string]: any
}
