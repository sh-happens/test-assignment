import { Config } from "./config";

let cachePage = 0;

export const getAscii = async (page, limit = "20", dispatch, sortBy, reset) => {
  if (cachePage >= page && !reset) {
    return null;
  } else {
    reset && dispatch({ type: "resetandsort", model: sortBy });
    try {
      const url = `${Config.API_URL}products?_page=${page}&_limit=${limit}&_sort=${sortBy}`;
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((pre) => pre.json())
        .then((pre) => {
          pre.length < 1
            ? dispatch({ type: "nomore" })
            : dispatch({ type: "preLoadItems", pre });
        })
        .then(() => dispatch({ type: "loadingFalse" }));
    } catch (error) {
      console.log(error);
    }
    reset ? (cachePage = null) : (cachePage = page);
  }
};
