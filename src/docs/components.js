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
      Product: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Product name",
            example: "POCO X3 Pro - 8 GB RAM/128 GB ROM",
          },
          name: {
            type: "string",
            description: "Product title",
            example: "POCO X3 Pro",
          },
          code: {
            type: "string",
            description: "Product code",
            example: "pxp-0001",
          },

          categoryId: {
            type: "string",
            description: "Category Id",
            example: "610204bc9ac51e02887498e4",
          },

          subCategoryId: {
            type: "string",
            description: "Category Id",
            example: "610206f0c42a6c0ad8eedb93",
          },

          brand: {
            type: "string",
            description: "Product brand",
            example: "Pocco",
          },

          description: {
            type: "string",
            description: "Product description",
            example: "Product details of POCO X3 Pro - 8 GB RAM/128 GB ROM",
          },

          qty: {
            type: "string",
            description: "Product quantity",
            example: "10",
          },
          price: {
            type: "number",
            description: "Product price",
            example: "10",
          },
          currency: {
            type: "string",
            description: "Product currency",
            example: "[TAKA, DOLLAR, EURO]",
          },
          image: {
            type: "object",
            properties: {
              large: {
                type: "string",
                description: "Product large image",
              },
              medium: {
                type: "string",
                description: "Product medium image",
              },
              thumbnail: {
                type: "string",
                description: "Product thumbnail",
              },
            },
          },
        },
      },

      Discount: {
        type: "object",
        properties: {
          discount: {
            type: "number",
            description:
              "Discount percentage. Only number without percentage symbol.",
            example: "3",
          },
          startDate: {
            type: "date",
            description: "Discount start date",
            example: "2021-08-01",
          },
          endDate: {
            type: "date",
            description: "Discount end date",
            example: "2021-08-03",
          },
          productId: {
            type: "string",
            description: "Enter product",
          },
          categoryId: {
            type: "string",
            description: "Enter categoryId",
          },
          subCategoryId: {
            type: "string",
            description: "Enter subCategoryId",
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
