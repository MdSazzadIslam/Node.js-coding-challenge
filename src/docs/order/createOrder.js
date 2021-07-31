module.exports = {
  post: {
    tags: ["Order operations"],
    description:
      "Please use code M21, A01,14-5410,lv-5-4600H for checking discount",
    operationId: "createOrder",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Order",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Order created successfully",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
