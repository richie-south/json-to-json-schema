import {Schema} from './types'
import {deepEqual} from './util'

type Options = {
  setExample?: boolean
  setRequired?: boolean
  setAdditionalProperties?: boolean
  additionalProperties?: boolean
}

const defaultOptions: Options = {
  setExample: false,
  setRequired: false,
  setAdditionalProperties: false,
  additionalProperties: true,
}

function addExample(data: object, value: unknown) {
  if (value === undefined) {
    return data
  }
  data['example'] = value
  data['examples'] = [value]
  return data
}

function addRequired(data: Schema, keys: string[]): Schema {
  data['required'] = keys
  return data
}

function addAdditionalProperties(data: Schema, value: boolean): Schema {
  data['additionalProperties'] = value
  return data
}

function addProperties(data: Schema, value: unknown, options: Options): Schema {
  if (options.setRequired) {
    switch (data.type) {
      case 'array':
        if (data.items[0]) {
          data = addRequired(data, data.items[0])
        }
        break
      case 'object':
        if (data.properties) {
          data = addRequired(data, Object.keys(data.properties))
        }
        break
    }
  }

  if (options.setAdditionalProperties) {
    switch (data.type) {
      case 'object':
        if (data.properties) {
          data = addAdditionalProperties(data, options.additionalProperties)
        }
        break
    }
  }

  if (options.setExample) {
    switch (data.type) {
      case 'object':
        if (!data.properties) {
          data = addExample(data, value)
        }
        break
      default:
        data = addExample(data, value)
    }
  }

  return data
}

export function generateSchema(
  value:
    | null
    | boolean
    | string
    | number
    | object
    | Array<string>
    | Array<number>
    | Array<object>
    | Array<null>
    | Array<boolean>,
  options: Options = defaultOptions,
): Schema {
  const typeOfValue = typeof value

  switch (typeOfValue) {
    case 'number':
      return addProperties(
        {type: Number.isInteger(value) ? 'integer' : 'number'},
        value,
        options,
      )
    case 'boolean':
      return addProperties({type: 'boolean'}, value, options)
    case 'string':
      return addProperties({type: 'string'}, value, options)
  }

  if (value === null) {
    return addProperties({type: 'null'}, value, options)
  }

  if (Array.isArray(value)) {
    if (value.length === 1) {
      return addProperties(
        {type: 'array', items: generateSchema(value[0], options)},
        value,
        options,
      )
    }

    if (value.length > 1) {
      const items = value.map((data) => generateSchema(data, options))
      if (deepEqual(...items)) {
        return addProperties(
          {type: 'array', items: items[0]},
          value[0],
          options,
        )
      }
    }

    return addProperties({type: 'array'}, undefined, options)
  }

  if (value instanceof Object) {
    if (!Object.keys(value).length) {
      return addProperties({type: 'object'}, value, options)
    }

    return addProperties(
      {
        type: 'object',
        properties: Object.entries(value).reduce(
          (accumulator, [key, value]) => {
            accumulator[key] = generateSchema(value, options)
            return accumulator
          },

          {} as Record<string, unknown>,
        ),
      },
      value,
      options,
    )
  }

  throw new TypeError(`Invalid value: ${String(value)}`)
}
