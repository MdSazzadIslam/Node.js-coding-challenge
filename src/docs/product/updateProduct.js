module.exports = {
  put: {
    tags: ["Product operations"],
    description: "Update product",
    operationId: "updateProduct",
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
      200: {
        description: "Product updated successfully",
      },
      404: {
        description: "Product id not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
