import React from "react";
import { Helpers } from "../helpers/helpers";

let adsId = {};
let prevId = 0;

export default ({ id }) => {
  let rdId = adsId[id];
  if (!rdId) {
    rdId = Helpers.randomAdsId(prevId);

    prevId = rdId;
    adsId[id] = rdId;
  }
  return (
    <td>
      <img src={`/ads/?r=${rdId}`} />
    </td>
  );
};
