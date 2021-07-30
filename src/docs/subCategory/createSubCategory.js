module.exports = {
  post: {
    tags: ["SubCategory operations"],
    description: "Create subCategory",
    operationId: "createSubCategory",
    parameters: [],
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
      201: {
        description: "SubCategory created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
