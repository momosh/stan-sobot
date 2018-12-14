import axios from "axios";
import {
  FETCH_HOTELS,
  FETCH_HOTEL_IMAGES,
  HOTELS_NEXT_PAGE,
  HOTELS_PREV_PAGE,
  HOTELS_SELECT_PAGE,
  FETCH_HOTEL_COMMENTS,
  SEND_HOTEL_COMMENT
} from "./types";

const api = axios.create({
  headers: {
    "Content-Type": "application/json"
  }
});

export const fetchHotels = (pageSize = 10) => async dispatch => {
  const { data } = await api.get("/api/hotels");

  dispatch({ type: FETCH_HOTELS, payload: { data, pageSize } });
};

export const fetchHotelImages = id => async dispatch => {
  const { data } = await api.get(`/api/hotels/images/${id}`);

  dispatch({ type: FETCH_HOTEL_IMAGES, payload: data });
};

export const fetchHotelComments = id => async dispatch => {
  const { data } = await api.get(`/api/hotels/comments/${id}`);

  dispatch({ type: FETCH_HOTEL_COMMENTS, payload: data });
};

export const nextHotelPage = () => ({
  type: HOTELS_NEXT_PAGE
});

export const prevHotelPage = () => ({
  type: HOTELS_PREV_PAGE
});

export const selectHotelPage = page => ({
  type: HOTELS_SELECT_PAGE,
  payload: page
});

export const sendHotelComment = (id, fullName, comment) => async dispatch => {
  const fData = new FormData();
  fData.set("fullName", fullName);
  fData.set("comment", comment);

  const { data } = await axios.post(`/api/hotels/comment/${id}`, fData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  dispatch({ type: SEND_HOTEL_COMMENT, payload: data });
};
