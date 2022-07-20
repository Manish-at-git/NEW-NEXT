import { put, call, takeEvery } from "redux-saga/effects";

import { API_KEY } from "../../Constants";

import {
  setMoviePick,
  setErrorMoviePick,
  setMoviePickTwo,
  setErrorMoviePickTwo,
  setgetMovieList,
  setErrorgetMovieList,
  setSingleMovie,
  setErrorSingleMovie,
  setSearchMovie,
  setErrorSearchMovie,
} from "../actions/index";
import {
  GET_MOVIEPICK,
  GET_MOVIEPICK_TWO,
  GET_MOVIELIST,
  GET_SINGLEMOVIE,
  GET_SEARCHMOVIE,
} from "../actionTypes";
import axios from "axios";

export function* handleMoviePickLoad() {
  try {
    const users = yield call(
      axios.get,
      `https://imdb-api.com/en/API/Top250Movies/${API_KEY}`
    );

    yield put(setMoviePick(users.data));
  } catch (error) {
    yield put(setErrorMoviePick(error.toString()));
  }
}

export function* handleMoviePickLoadtwo() {
  try {
    const users = yield call(
      axios.get,
      `https://imdb-api.com/en/API/InTheaters/${API_KEY}`
    );

    yield put(setMoviePickTwo(users.data));
  } catch (error) {
    yield put(setErrorMoviePickTwo(error.toString()));
  }
}

export function* handleMovieListLoad(action) {
  try {
    let url = action.MovieListPage;

    const users = yield call(
      axios.get,
      `https://imdb-api.com/en/API/${url}/${API_KEY}`
    );

    yield put(setgetMovieList(users.data));
  } catch (error) {
    yield put(setErrorgetMovieList(error.toString()));
  }
}

export function* handleSingleMovieLoad(action) {
  try {
    const users = yield call(
      axios.get,
      `https://imdb-api.com/en/API/Title/${API_KEY}/${action.id}`
    );
    const images = yield call(
      axios.get,
      `https://imdb-api.com/en/API/Images/${API_KEY}/${action.id}`
    );
    const trailers = yield call(
      axios.get,
      `https://imdb-api.com/en/API/Trailer/${API_KEY}/${action.id}`
    );

    const singleMovie = {
      data: users.data,
      images: images.data.items,
      trailer: trailers.data.linkEmbed,
    };

    yield put(setSingleMovie(singleMovie));
  } catch (error) {
    yield put(setErrorSingleMovie(error.toString()));
  }
}

export function* handleSearchMovieLoad(action) {
  try {
    const users = yield call(
      axios.get,
      `https://imdb-api.com/en/API/SearchTitle/${API_KEY}/${action.search}`
    );
    yield put(setSearchMovie(users.data));
  } catch (error) {
    yield put(setErrorSearchMovie(error.toString()));
  }
}

export default function* watchImagesLoad() {
  yield takeEvery(GET_MOVIEPICK, handleMoviePickLoad);
  yield takeEvery(GET_MOVIEPICK_TWO, handleMoviePickLoadtwo);
  yield takeEvery(GET_MOVIELIST, handleMovieListLoad);
  yield takeEvery(GET_SINGLEMOVIE, handleSingleMovieLoad);
  yield takeEvery(GET_SEARCHMOVIE, handleSearchMovieLoad);
}
