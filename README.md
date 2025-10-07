# Basics of json to json schema

For your basic schema needs.

Works in the browser.

_Does not handle "format" ex, format: 'email' | 'date-time' | 'uri'_

### Examples

```typescript
import {generateSchema} from 'easy-json-to-json-schema'

const result = generateSchema({
  orderId: 'A1009',
  customer: {
    id: 17,
    name: 'John Doe',
    email: 'john@example.com',
  },
  items: [
    {
      productId: 123,
      name: 'Laptop',
      price: 999.99,
      quantity: 1,
    },
    {
      productId: 456,
      name: 'Mouse',
      price: 19.99,
      quantity: 2,
    },
  ],
  total: 1039.97,
  paid: true,
  shippedAt: null,
})

/** Ouptputs this schema
  {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
      },
      customer: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            quantity: {
              type: 'integer',
            },
          },
        },
      },
      total: {
        type: 'number',
      },
      paid: {
        type: 'boolean',
      },
      shippedAt: {
        type: 'null',
      },
    },
  }
*/
```

**With optional options**

```typescript
type Options = {
  setExample?: boolean
  setRequired?: boolean
  setAdditionalProperties?: boolean
  additionalProperties?: boolean
}

const result = generateSchema(
  {
    customer: {
      id: 17,
      name: 'John Doe',
      email: 'john@example.com',
    },
  },
  {
    setExample: true,
    setRequired: true,
    setAdditionalProperties: true,
    additionalProperties: false,
  },
)
/*
  {
    "type": "object",
    "properties": {
      "customer": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 17,
            "examples": [
              17
            ]
          },
          "name": {
            "type": "string",
            "example": "John Doe",
            "examples": [
              "John Doe"
            ]
          },
          "email": {
            "type": "string",
            "example": "john@example.com",
            "examples": [
              "john@example.com"
            ]
          }
        },
        "required": [
          "id",
          "name",
          "email"
        ],
        "additionalProperties": false
      }
    },
    "required": [
      "customer"
    ],
    "additionalProperties": false
  }
*/
```
