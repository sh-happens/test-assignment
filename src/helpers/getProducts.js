import { Config } from "./config";

let cachePage = null;
export const getAscii = async (page, limit = "10", dispatch) => {
  if (cachePage === page || cachePage > page) {
    return null;
  } else {
    console.log("get data is running with page ", page);
  }

  try {
    const url = `${Config.API_URL}products?_page=${page + 1}&_limit=${limit}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((pre) => pre.json())
      .then((pre) => {
        dispatch({ type: "preLoadItems", pre });
      })
      .then(() => dispatch({ type: "loadingFalse" }));
  } catch (error) {
    console.log(error);
  }
  console.log("cache", cachePage);
  cachePage = page;
  console.log("page", page);
};
