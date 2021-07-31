module.exports = {
  put: {
    tags: ["Discount operations"],
    description: "Update discount",
    operationId: "updateDiscount",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Product id is required",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Discount",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Discount updated successfully",
      },
      404: {
        description: "Discount id not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
