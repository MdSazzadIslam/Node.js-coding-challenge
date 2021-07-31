module.exports = {
  get: {
    tags: ["Product operations"],
    description: "Get a product",
    operationId: "getProduct",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id is required",
      },
    ],
    responses: {
      200: {
        description: "Product is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Product",
            },
          },
        },
      },
      404: {
        description: "Product is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Product",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
