module.exports = {
  get: {
    tags: ["Product operations"],
    description: "Get products",
    operationId: "getProducts",
    parameters: [],
    responses: {
      200: {
        description: "Products are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
    },
  },
};
