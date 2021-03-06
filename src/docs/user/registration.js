module.exports = {
  post: {
    tags: ["Authentication"],
    description: "Registration",
    operationId: "registration",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Registration",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Registration successfull",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
