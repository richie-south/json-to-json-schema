import {deepEqual} from './util'

export function generateSchema(value) {
  const typeOfValue = typeof value

  switch (typeOfValue) {
    case 'number':
      return {type: Number.isInteger(value) ? 'integer' : 'number'}
    case 'boolean':
      return {type: 'boolean'}
    case 'string':
      return {type: 'string'}
  }

  if (value === null) {
    return {type: 'null'}
  }

  if (Array.isArray(value)) {
    if (value.length === 1) {
      return {type: 'array', items: generateSchema(value[0])}
    }

    if (value.length > 1) {
      const items = value.map(generateSchema)
      if (deepEqual(...items)) {
        return {type: 'array', items: items[0]}
      }
    }

    return {type: 'array'}
  }

  if (value instanceof Object) {
    if (!Object.keys(value).length) {
      return {type: 'object'}
    }

    return {
      type: 'object',
      properties: Object.entries(value).reduce(
        (accumulator, [key, value]) => {
          accumulator[key] = generateSchema(value)
          return accumulator
        },

        {} as Record<string, unknown>,
      ),
    }
  }

  throw new TypeError(`Invalid value: ${String(value)}`)
}
