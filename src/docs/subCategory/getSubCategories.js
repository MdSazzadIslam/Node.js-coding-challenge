module.exports = {
  get: {
    tags: ["SubCategory operations"],
    description: "Get subCategories",
    operationId: "getSubCategories",
    parameters: [],
    responses: {
      200: {
        description: "SubCategories are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SubCategory",
            },
          },
        },
      },
    },
  },
};
