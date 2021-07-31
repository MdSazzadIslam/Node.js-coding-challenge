module.exports = {
  put: {
    tags: ["SubCategory operations"],
    description: "Update subCategory",
    operationId: "updateSubCategory",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "SubCategory id is required",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SubCategory",
          },
        },
      },
    },
    responses: {
      200: {
        description: "SubCategory updated successfully",
      },
      404: {
        description: "SubCategory id not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
