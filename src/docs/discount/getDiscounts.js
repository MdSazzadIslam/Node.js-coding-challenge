module.exports = {
  get: {
    tags: ["Discount operations"],
    description: "Get discount",
    operationId: "getDiscounts",
    parameters: [],
    responses: {
      200: {
        description: "Discounts are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Discount",
            },
          },
        },
      },
    },
  },
};
