export default {
  type: "object",
  properties: {
    sueldoAnterior: { type: 'number' },
    sueldoNuevo: { type: 'number' }
  },
  required: ['sueldoAnterior', 'sueldoNuevo']
} as const;
