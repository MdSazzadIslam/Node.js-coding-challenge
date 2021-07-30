module.exports = {
  get: {
    tags: ["Authentication"],
    description: "Get users",
    operationId: "getUsers",
    parameters: [],
    responses: {
      200: {
        description: "users are obtained",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
    },
  },
};
