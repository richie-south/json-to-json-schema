import {generateSchema} from './index'

describe('generateSchema', () => {
  it('exports function', () => {
    expect(generateSchema).toBe(generateSchema)
  })

  it('generates string schema', () => {
    const result = generateSchema('Hello world')

    expect(result).toEqual({type: 'string'})
  })

  it('generates integer schema', () => {
    const result = generateSchema(42)

    expect(result).toEqual({type: 'integer'})
  })

  it('generates number schema', () => {
    const result = generateSchema(4.2)

    expect(result).toEqual({type: 'number'})
  })

  it('generates boolean schema', () => {
    const result = generateSchema(true)

    expect(result).toEqual({type: 'boolean'})
  })

  it('generates null schema', () => {
    const result = generateSchema(null)

    expect(result).toEqual({type: 'null'})
  })

  it('generates array of string schema', () => {
    const result = generateSchema(['apple', 'banana', 'cherry'])

    expect(result).toEqual({type: 'array', items: {type: 'string'}})
  })

  it('generates array of objects schema', () => {
    const result = generateSchema([
      {id: 1, name: 'Alice'},
      {id: 2, name: 'Bob'},
    ])

    expect(result).toEqual({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
          },
          name: {
            type: 'string',
          },
        },
      },
    })
  })

  it('generates array of different objects schema', () => {
    const result = generateSchema([
      {id: 1, name: 'Alice'},
      {id: 2, url: 'example.com'},
    ])

    expect(result).toEqual({
      type: 'array',
    })
  })

  it('generates object with array schema', () => {
    const result = generateSchema({
      title: 'Shopping List',
      items: ['milk', 'bread', 'eggs'],
    })

    expect(result).toEqual({
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        items: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    })
  })

  it('generates Nested with array of objects', () => {
    const result = generateSchema({
      user: {
        id: 7,
        name: 'Charlie',
        emails: [
          {type: 'work', address: 'charlie@work.com'},
          {type: 'personal', address: 'charlie@gmail.com'},
        ],
      },
    })

    expect(result).toEqual({
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            emails: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                  },
                  address: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
      },
    })
  })

  it('generates basic schema', () => {
    const result = generateSchema({
      productId: 1,
      productName: 'A green door',
      price: 12.5,
      tags: ['home', 'green'],
    })

    expect(result).toEqual({
      type: 'object',
      properties: {
        productId: {type: 'integer'},
        productName: {type: 'string'},
        price: {type: 'number'},
        tags: {type: 'array', items: {type: 'string'}},
      },
    })
  })

  it('generates complex schema', () => {
    const result = generateSchema({
      productId: 1,
      productName: 'An ice sculpture',
      price: 12.5,
      tags: ['cold', 'ice'],
      dimensions: {
        length: 7.0,
        width: 12.0,
        height: 9.5,
      },
      warehouseLocation: {
        latitude: -78.75,
        longitude: 20.4,
      },
    })

    expect(result).toEqual({
      type: 'object',
      properties: {
        productId: {type: 'integer'},
        productName: {type: 'string'},
        price: {type: 'number'},
        tags: {type: 'array', items: {type: 'string'}},
        dimensions: {
          type: 'object',
          properties: {
            length: {type: 'integer'},
            width: {type: 'integer'},
            height: {type: 'number'},
          },
        },
        warehouseLocation: {
          type: 'object',
          properties: {
            latitude: {type: 'number'},
            longitude: {type: 'number'},
          },
        },
      },
    })
  })

  it('generates complex 2 schema', () => {
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

    expect(result).toEqual({
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
    })
  })

  it('generates complex with example schema', () => {
    const result = generateSchema(
      {
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
      },
      {
        setExample: true,
      },
    )

    expect(result).toEqual({
      type: 'object',
      properties: {
        orderId: {
          type: 'string',
          example: 'A1009',
          examples: ['A1009'],
        },
        customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 17,
              examples: [17],
            },
            name: {
              type: 'string',
              example: 'John Doe',
              examples: ['John Doe'],
            },
            email: {
              type: 'string',
              example: 'john@example.com',
              examples: ['john@example.com'],
            },
          },
          example: {
            id: 17,
            name: 'John Doe',
            email: 'john@example.com',
          },
          examples: [
            {
              id: 17,
              name: 'John Doe',
              email: 'john@example.com',
            },
          ],
        },
        items: {
          type: 'array',
        },
        total: {
          type: 'number',
          example: 1039.97,
          examples: [1039.97],
        },
        paid: {
          type: 'boolean',
          example: true,
          examples: [true],
        },
        shippedAt: {
          type: 'null',
          example: null,
          examples: [null],
        },
      },
      example: {
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
      },
      examples: [
        {
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
        },
      ],
    })
  })

  it('generates complex with required schema', () => {
    const result = generateSchema(
      {
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
      },
      {
        setRequired: true,
      },
    )

    expect(result).toEqual({
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
          required: ['id', 'name', 'email'],
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
            required: ['productId', 'name', 'price', 'quantity'],
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
      required: ['orderId', 'customer', 'items', 'total', 'paid', 'shippedAt'],
    })
  })

  it('generates complex with additionalProperties schema', () => {
    const result = generateSchema(
      {
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
      },
      {
        setAdditionalProperties: true,
        additionalProperties: true,
      },
    )

    expect(result).toEqual({
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
          additionalProperties: true,
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
            additionalProperties: true,
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
      additionalProperties: true,
    })
  })

  it('generates with all options schema', () => {
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

    expect(result).toEqual({
      type: 'object',
      properties: {
        customer: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 17,
              examples: [17],
            },
            name: {
              type: 'string',
              example: 'John Doe',
              examples: ['John Doe'],
            },
            email: {
              type: 'string',
              example: 'john@example.com',
              examples: ['john@example.com'],
            },
          },
          required: ['id', 'name', 'email'],
          additionalProperties: false,
          example: {
            id: 17,
            name: 'John Doe',
            email: 'john@example.com',
          },
          examples: [
            {
              id: 17,
              name: 'John Doe',
              email: 'john@example.com',
            },
          ],
        },
      },
      required: ['customer'],
      additionalProperties: false,
      example: {
        customer: {
          id: 17,
          name: 'John Doe',
          email: 'john@example.com',
        },
      },
      examples: [
        {
          customer: {
            id: 17,
            name: 'John Doe',
            email: 'john@example.com',
          },
        },
      ],
    })
  })
})
