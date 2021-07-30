module.exports = {
  post: {
    tags: ["Authentication"],
    description: "Login",
    operationId: "login",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/LoginInput",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Login successfull",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
