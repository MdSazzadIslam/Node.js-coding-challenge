module.exports = {
  get: {
    tags: ["SubCategory operations"],
    description: "Get a subCategory",
    operationId: "getSubCategory",
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
    responses: {
      200: {
        description: "SubCategory is obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SubCategory",
            },
          },
        },
      },
      404: {
        description: "SubCategory is not found",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error",
              example: {
                message: "We can't find the SubCategory",
                internal_code: "Invalid id",
              },
            },
          },
        },
      },
    },
  },
};
