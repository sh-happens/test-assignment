import { Config } from "./config";

export const Helpers = {
  daysDiff(tnow, tdate, myDate) {
    let diff = parseInt((tnow - tdate) / (24 * 3600 * 1000));
    if (diff == 0) {
      return "Today";
    } else if (diff == 1) {
      return "Yesterday";
    } else if (diff <= 7 && diff >= 2) {
      return `${diff} days ago`;
    } else {
      const data = new Date(myDate);
      const event = new Intl.DateTimeFormat("default", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(data);
      return event.toString("yyyyMM");
    }
  },
};
