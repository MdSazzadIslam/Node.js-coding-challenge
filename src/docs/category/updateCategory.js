module.exports = {
  put: {
    tags: ["Category operations"],
    description: "Update category",
    operationId: "updateCategory",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Id of todo to be updated",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Category",
          },
        },
      },
    },
    responses: {
      200: {
        description: "Category updated successfully",
      },
      404: {
        description: "Category not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
