module.exports = {
  post: {
    tags: ["Category operations"],
    description: "Create category",
    operationId: "createCategory",
    parameters: [],
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
      201: {
        description: "Category created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
