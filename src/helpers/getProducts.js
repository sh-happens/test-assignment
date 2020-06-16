import { Config } from "./config";

let cachePage = null;
let cachesortBy = null;
export const getAscii = async (page, limit = "20", dispatch, sortBy, reset) => {
  if (cachePage === page && cachePage > page) {
    console.log("condition not met");
    return null;
  } else {
    // console.log('get data is running with page ', page)
    reset && dispatch({ type: "resetandsort", model: sortBy });
    page == 1 && dispatch({ type: "loadingTrue" });
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
          // pre.length < 1 ? dispatch({ type: 'nomore' }) : dispatch({ type: 'preLoadItems', pre })
          // pre.length < 1 ? dispatch({ type: 'nomore' }) : dispatch({ type: 'preLoadItems', pre })
          // dispatch({ type: 'preLoadItems', pre })
          // console.log(reset)
        })
        .then
        // ()=> dispatch({type : 'loadingFalse' })
        ();
    } catch (error) {
      console.log(error);
    }
    // console.log('cache' ,cachesortBy)
    reset ? (cachePage = null) : (cachePage = page);
    cachesortBy = sortBy;
  }
};
