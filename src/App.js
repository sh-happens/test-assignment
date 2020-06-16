import React, { useState, useEffect, useContext } from "react";
import { getAscii } from "./helpers/getProducts";
import { ThisContext } from "./index";
import { Helpers } from "./helpers/helpers";
import Spinner from "./helpers/Spinner";

import Add from "./components/Add";

export default () => {
  const { state, dispatch } = useContext(ThisContext);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getAscii(1, 20, dispatch, state.sortBy, false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 ||
      isFetching
    )
      setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    getAscii(state.page, 20, dispatch, state.sortBy, false);
    setTimeout(() => {
      setIsFetching(false);
    }, 1000);
  };
  return (
    <>
      {state.loading || isFetching ? <Spinner /> : null}
      <table className='container'>
        <thead>
          <tr>
            <th onClick={() => getAscii(1, 20, dispatch, "id", true)}>
              <h1>{state.sortBy == "id" && <p>Sorted by</p>} ID </h1>
            </th>
            <th onClick={() => getAscii(1, 20, dispatch, "size", true)}>
              <h1>{state.sortBy == "size" && <p>Sorted by</p>}Size</h1>
            </th>
            <th>
              <h1>Face</h1>
            </th>
            <th onClick={() => getAscii(1, 20, dispatch, "price", true)}>
              <h1>{state.sortBy == "price" && <p> Sorted by </p>} Price </h1>
            </th>
            <th>
              <h1>Date</h1>
            </th>
          </tr>
        </thead>
        {state.data.map((r, i) => {
          let tnow = new Date().getTime();
          let tdate = new Date(r.date).getTime();
          let currencyString = "£" + (r.price / 100).toFixed(2);
          return (
            <tbody key={r.id}>
              <tr>
                {state.loading == false && i !== 0 && (i + 1) % 20 === 0 ? (
                  <Add id={r.id} />
                ) : null}
                {/* {isFetching && i !== 0 && (i + 1) % 20 === 0 ? (
                  <Spinner />
                ) : null} */}
              </tr>
              <tr>
                <td>{r.id}</td>
                <td>{r.size}</td>
                <td style={{ fontSize: r.size }}>{r.face}</td>
                <td>{currencyString}</td>
                <td>{Helpers.daysDiff(tnow, tdate, r.date)}</td>
              </tr>
              {state.more == false && <td>~ end of catalogue ~</td>}
            </tbody>
          );
        })}
      </table>
      {isFetching && <Spinner />}
    </>
  );
};
