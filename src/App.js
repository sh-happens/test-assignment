import React, { useContext, useEffect, useState } from "react";

import { getAscii } from "./helpers/getProducts";
import { ThisContext } from "./index";
import { Helpers } from "./helpers/helpers";

import Spinner from "./helpers/Spinner";

export default () => {
  const { state, dispatch } = useContext(ThisContext);
  const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   getAscii(1, 20, dispatch);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);
  // }, [state, onScroll]);

  // const onScroll = () => {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //     state.more == false &&
  //     state.loading == false
  //   ) {
  //     getAscii(state.page, 21, dispatch);
  //   }
  // };

  useEffect(() => {
    getAscii(1, 20, dispatch, state.sortBy, false);
    console.log("first use effect is run");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching, state.data]);

  const fetchMoreListItems = () => {
    // console.log('fetchMoreListItems runs')
    getAscii(state.page, 20, dispatch, state.sortBy, false);
    setTimeout(() => {
      setIsFetching(false);
    }, 1500);
  };

  const addRender = (id) => {
    return (
      <tr>
        <td>
          <img src={`/ads/?r=6`} />
        </td>
        {HasMore()}
        {End()}
      </tr>
    );
  };

  const HasMore = () =>
    isFetching && (
      <td>
        <Spinner />
      </td>
    );
  const End = () => state.more == false && <td>~ end of catalogue ~</td>;

  const Table = () => {
    return (
      <Table className='container'>
        <thead>
          <tr>
            <th onClick={() => getAscii(1, 20, dispatch, "id", true)}>
              <h1>ID</h1>
            </th>
            <th onClick={() => getAscii(1, 20, dispatch, "size", true)}>
              <h1>Size</h1>
            </th>
            <th>
              <h1>Face</h1>
            </th>
            <th onClick={() => getAscii(1, 20, dispatch, "price", true)}>
              <h1>Price</h1>
            </th>
            <th>
              <h1>Date</h1>
            </th>
          </tr>
        </thead>
        {state.data.map((r, i) => {
          let tnow = new Date().getTime();
          let tdate = new Date(r.date).getTime();
          let currencyString = "$" + (r.price / 100).toFixed(2);
          return (
            <tbody key={r.id}>
              {i !== 0 && (i + 1) % 20 === 0 && addRender(r.id)}

              <tr>
                <td>{r.id}</td>
                <td>{r.size}</td>
                <td style={{ fontSize: r.size }}>{r.face}</td>
                <td>{currencyString}</td>
                <td>{Helpers.daysDiff(tnow, tdate, r.date)}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    );
  };

  return <> {state.loading ? <Spinner /> : <Table />}</>;
};
