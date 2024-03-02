export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    diameter :{
      type: "integer",
      minimum: 0
    }
  },
  required: ["name", "diameter"]
} as const;



