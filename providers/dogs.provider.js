export default (context) => {
    const url = "https://dog.ceo/api";
    return {
      getDogs: async () => {
        try {
          const response = await context.$axios({
            method: "get",
            url: `${url}/breeds/list/all`,
          });
          return response.data.message;
        } catch (err) {
          // context.error(err);
          return {
            error: true,
            errorData: err,
          };
        }
      },
      getImages: async (breedName) => {
        try {
          const response = await context.$axios({
            method: "get",
            url: `${url}/breed/${breedName}/images`,
          });
          return response.data.message;
        } catch (err) {
          // context.error(err);
          return {
            error: true,
            errorData: err,
          };
        }
      },
    };
  };
  