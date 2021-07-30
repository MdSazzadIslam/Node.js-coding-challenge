module.exports = {
  components: {
    schemas: {
      id: {
        type: "string",
        description: "An id",
        example: "6104681799dd5134b48d202d",
      },

      User: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            description: "Your first name",
            example: "Md Sazzadul",
          },
          lastName: {
            type: "string",
            description: "Your last name",
            example: "Islam",
          },

          email: {
            type: "string",
            description: "Your email",
            example: "netsazzad@gmail.com",
          },
          password: {
            type: "string",
            description: "Your password",
            example: "12345678",
          },

          gender: {
            type: "string",
            description: "Your gender",
            example: "Male, Female, Trigender",
          },
          picture: {
            type: "string",
            description: "Your picture",
          },
          address: {
            type: "object",
            properties: {
              location: {
                type: "object",
                properties: {
                  latitude: {
                    type: "string",
                    description: "Your location Latitude",
                    example: "1002.24",
                  },
                  longitude: {
                    type: "string",
                    description: "Your location Longitude",
                    example: "1232.24",
                  },
                },
              },
              street: {
                type: "object",
                properties: {
                  number: {
                    type: "string",
                    description: "Your street number",
                    example: "4/8",
                  },
                  name: {
                    type: "string",
                    description: "Your street name",
                    example: "ABCD",
                  },
                },
              },
              city: {
                type: "string",
                description: "Your city name",
                example: "Dhaka",
              },
              state: {
                type: "string",
                description: "Your state",
                example: "Dhaka",
              },
              country: {
                type: "string",
                description: "Your country name",
                example: "Bangladesh",
              },
              postCode: {
                type: "number",
                description: "Postal code",
                example: "1216",
              },
            },
          },
        },
      },
      RegistrationInput: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
            description: "Your first name",
            example: "Md Sazzadul",
          },
          lastName: {
            type: "string",
            description: "Your last name",
            example: "Islam",
          },

          email: {
            type: "string",
            description: "Your email",
            example: "netsazzad@gmail.com",
          },
          password: {
            type: "string",
            description: "Your password",
            example: "12345678",
          },
        },
      },

      LoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Your email",
            example: "netsazzad@gmail.com",
          },
          password: {
            type: "string",
            description: "Your password",
            example: "12345678",
          },
        },
      },

      Category: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Product catgory name",
            example: "Television",
          },
          code: {
            type: "string",
            description: "Product code",
            example: "tv-0001",
          },
        },
      },

      SubCategory: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Product sub Catgory name",
            example: "Sony Tv",
          },
          code: {
            type: "string",
            description: "Product code",
            example: "st-0001",
          },
          categoryId: {
            type: "string",
            description: "Category Id",
            example: "610204e89ac51e02887498e6",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
  },
};
