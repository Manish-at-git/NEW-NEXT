import {
  SIGNIN,
  SIGNOUT,
  NAVBARTOGGLED,
  GET_MOVIEPICK,
  GET_MOVIEPICK_SUCCESS,
  GET_MOVIEPICK_ERROR,
  GET_MOVIEPICK_TWO,
  GET_MOVIEPICK_SUCCESS_TWO,
  GET_MOVIEPICK_ERROR_TWO,
  GET_MOVIELIST,
  GET_MOVIELIST_SUCCESS,
  GET_MOVIELIST_ERROR,
  GET_SINGLEMOVIE,
  GET_SINGLEMOVIE_SUCCESS,
  GET_SINGLEMOVIE_ERROR,
  GET_SEARCHMOVIE,
  GET_SEARCHMOVIE_SUCCESS,
  GET_SEARCHMOVIE_ERROR,
} from "../actionTypes";

///  FIREBASE

export const loadSignIn = (email) => {
  return {
    type: SIGNIN,
    email,
  };
};

export const loadSignOut = () => ({
  type: SIGNOUT,
});

/// NAVBAR TOGGLE

export const navbarToggle = () => {
  return {
    type: NAVBARTOGGLED,
  };
};

/// MOVIEPICK ONE

export const getMoviePick = () => {
  return {
    type: GET_MOVIEPICK,
  };
};

export const setMoviePick = (users) => {
  return {
    type: GET_MOVIEPICK_SUCCESS,
    users,
  };
};
export const setErrorMoviePick = (error) => {
  return {
    type: GET_MOVIEPICK_ERROR,
    error,
  };
};

/// MOVIEPICK TWO

export const getMoviePickTwo = () => {
  return {
    type: GET_MOVIEPICK_TWO,
  };
};

export const setMoviePickTwo = (users) => {
  return {
    type: GET_MOVIEPICK_SUCCESS_TWO,
    users,
  };
};
export const setErrorMoviePickTwo = (error) => {
  return {
    type: GET_MOVIEPICK_ERROR_TWO,
    error,
  };
};

/// MOVIELIST

export const getMovieList = (MovieListPage) => {
  return {
    type: GET_MOVIELIST,
    MovieListPage,
  };
};

export const setgetMovieList = (users) => {
  return {
    type: GET_MOVIELIST_SUCCESS,
    users,
  };
};
export const setErrorgetMovieList = (error) => {
  return {
    type: GET_MOVIELIST_ERROR,
    error,
  };
};

/// SINGLEMOVIE

export const getSingleMovie = (id) => {
  return {
    type: GET_SINGLEMOVIE,
    id,
  };
};

export const setSingleMovie = (users) => {
  return {
    type: GET_SINGLEMOVIE_SUCCESS,
    users,
  };
};
export const setErrorSingleMovie = (error) => {
  return {
    type: GET_SINGLEMOVIE_ERROR,
    error,
  };
};

/// SEARCHMOVIE

export const getSearchMovie = (search) => {
  return {
    type: GET_SEARCHMOVIE,
    search,
  };
};

export const setSearchMovie = (users) => {
  return {
    type: GET_SEARCHMOVIE_SUCCESS,
    users,
  };
};
export const setErrorSearchMovie = (error) => {
  return {
    type: GET_SEARCHMOVIE_ERROR,
    error,
  };
};
