import {
  FETCH_HOTELS,
  FETCH_HOTEL_IMAGES,
  HOTELS_NEXT_PAGE,
  HOTELS_PREV_PAGE,
  HOTELS_SELECT_PAGE,
  FETCH_HOTEL_COMMENTS
} from "../actions/types";
import _ from "lodash";

const initialValue = {
  all: {},
  pagesNum: null,
  currentPage: 1,
  pages: {},
  images: [],
  comments: []
};

export default function(state = initialValue, { type, payload }) {
  switch (type) {
    case FETCH_HOTELS:
      const { data, pageSize } = payload;
      let _all = {};
      for (let hotel of data) {
        _all = {
          ..._all,
          [hotel.id]: hotel
        };
      }

      const pages = _.chunk(_.keys(_all), pageSize);
      const pagesNum = pages.length;

      let _pages = {};
      for (const [index, page] of pages.entries()) {
        _pages = {
          ..._pages,
          [index + 1]: {
            ids: page
          }
        };
      }

      return { ...state, all: _all, pagesNum, pages: _pages };

    case FETCH_HOTEL_IMAGES:
      const { images } = payload;
      const _images = images.map(image => ({
        original: image,
        thumbnail: image
      }));
      return { ...state, images: _images };

    case HOTELS_PREV_PAGE:
      if (state.currentPage <= 1) return state;
      return { ...state, currentPage: state.currentPage - 1 };

    case HOTELS_NEXT_PAGE:
      if (state.currentPage >= state.pagesNum) return state;
      return { ...state, currentPage: state.currentPage + 1 };

    case HOTELS_SELECT_PAGE:
      return { ...state, currentPage: payload };
    case FETCH_HOTEL_COMMENTS:
      return { ...state, comments: payload };
    default:
      return state;
  }
}
