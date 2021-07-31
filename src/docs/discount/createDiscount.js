module.exports = {
  post: {
    tags: ["Discount operations"],
    description:
      "Please Enter at least one value for ProductId, CategoryId or SubCategoryId",
    operationId: "createDiscount",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Discount",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Discount created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
