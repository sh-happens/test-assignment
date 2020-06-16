import React, { useState, useEffect, useContext } from "react";
import { getAscii } from "./helpers/getProducts";
import { ThisContext } from "./index";
import { Helpers } from "./helpers/helpers";
import Spinner from "./helpers/Spinner";
import "./css/main.css";

import Add from "./components/Add";

export default () => {
  const { state, dispatch } = useContext(ThisContext);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getAscii(1, 20, dispatch, state.sortBy, false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isFetching
    ) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    isFetching && getAscii(state.page, 20, dispatch, state.sortBy, false);
  }, [isFetching]);

  return (
    <div className='container'>
      {state.loading ? <Spinner /> : null}
      <div>
        <div className='header'>
          <p>Click to sort: </p>
          <div
            className='sortingTitle'
            onClick={() => getAscii(1, 20, dispatch, "id", true)}
          >
            <h3>{state.sortBy == "id" && <p>Sorted by</p>} ID </h3>
          </div>
          <div
            className='sortingTitle'
            onClick={() => getAscii(1, 20, dispatch, "size", true)}
          >
            <h3>{state.sortBy == "size" && <p>Sorted by</p>}Size</h3>
          </div>
          <div
            className='sortingTitle'
            onClick={() => getAscii(1, 20, dispatch, "price", true)}
          >
            <h3>{state.sortBy == "price" && <p> Sorted by </p>} Price </h3>
          </div>
        </div>
        <div className='itemsContainer'>
          {state.data.map((r, i) => {
            let tnow = new Date().getTime();
            let tdate = new Date(r.date).getTime();
            let currencyString = "$" + (r.price / 100).toFixed(2);
            return (
              <div className='itemInnerContainer' key={r.id}>
                <div>
                  {state.loading == false && i !== 0 && (i + 1) % 20 === 0 ? (
                    <Add id={r.id} />
                  ) : null}
                </div>
                <div className='item'>
                  <div>{r.id}</div>
                  <div>{r.size}</div>
                  <div style={{ fontSize: r.size }}>{r.face}</div>
                  <div>{currencyString}</div>
                  <div>{Helpers.daysDiff(tnow, tdate, r.date)}</div>
                </div>
                {state.more == false && <div>~ end of catalogue ~</div>}
              </div>
            );
          })}
        </div>
      </div>
      {isFetching && <Spinner />}
    </div>
  );
};
