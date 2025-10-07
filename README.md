# json-to-json-schema

For your basic schema needs.

Works in the browser.

```typescript
import {generateSchema} from 'easy-json-to-json-schema'

const result = generateSchema({
  productId: 1,
  productName: 'A green door',
  price: 12.5,
  tags: ['home', 'green'],
})

/**
 {
    type: 'object',
    properties: {
      productId: {type: 'integer'},
      productName: {type: 'string'},
      price: {type: 'number'},
      tags: {type: 'array', items: {type: 'string'}},
    },
  }
*/
```
