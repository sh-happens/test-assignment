export const initialState = {
  count: 1,
  loading: true,
  sortBy: null,
  data: [],
  preload: [],
  more: true,
  page: 1,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "nomore":
      return { ...state, more: false };
    case "preLoadItems":
      return {
        ...state,
        page: state.page + 1,
        data: [...state.data, ...action.pre],
        loading: false,
      };
    case "loadingTrue":
      return { ...state, loading: true };
    case "loadingFalse":
      return { ...state, loading: false };
    case "resetandsort":
      return { ...state, data: [], sortBy: action.model, page: 1 };

    default:
      return state;
  }
};
