module.exports = {
  get: {
    tags: ["Discount operations"],
    description: "Get a discount",
    operationId: "getDiscount",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "Discount id is required",
      },
    ],
    responses: {
      200: {
        description: "Discount is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Discount",
            },
          },
        },
      },
      404: {
        description: "Discount is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Discount",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
