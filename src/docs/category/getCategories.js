module.exports = {
  get: {
    tags: ["Category operations"],
    description: "Get categories",
    operationId: "getCategories",
    parameters: [],
    responses: {
      200: {
        description: "Categories are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
    },
  },
};
