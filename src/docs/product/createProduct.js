module.exports = {
  post: {
    tags: ["Product operations"],
    description: "Create product",
    operationId: "createProduct",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Product",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Product created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
