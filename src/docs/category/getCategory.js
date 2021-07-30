module.exports = {
  get: {
    tags: ["Category operations"],
    description: "Get a category",
    operationId: "getCategory",
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          $ref: "#/components/schemas/id",
        },
        required: true,
        description: "A category id",
      },
    ],
    responses: {
      200: {
        description: "Category is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      404: {
        description: "Category is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the Category",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
