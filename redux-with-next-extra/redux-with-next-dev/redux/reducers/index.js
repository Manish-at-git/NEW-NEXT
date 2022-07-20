import {
  GET_MOVIEPICK_ERROR,
  GET_MOVIEPICK_ERROR_TWO,
  GET_MOVIELIST_ERROR,
  GET_SINGLEMOVIE_ERROR,
  GET_SEARCHMOVIE_ERROR,
  GET_MOVIEPICK_SUCCESS,
  GET_MOVIEPICK_SUCCESS_TWO,
  GET_MOVIELIST_SUCCESS,
  GET_SINGLEMOVIE_SUCCESS,
  GET_SEARCHMOVIE_SUCCESS,
  GET_SEARCHMOVIE,
  NAVBARTOGGLED,
  SIGNIN,
  SIGNOUT,
} from "../actionTypes";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  signIn: "",
  loading: false,
  navbarOpened: false,
  error: "",
  moviePick: [],
  moviePickTwo: [],
  movieList: [],
  singleMovie: { data: {}, images: {}, trailer: "" },
  search: { loading: false, searchResults: [] },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HYDRATE:
      const nextState = {
        ...state, // use previous state
        ...action.payload.main, // apply delta from hydration
      };
      if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    case NAVBARTOGGLED:
      return {
        ...state,
        navbarOpened: !state.navbarOpened,
      };
    case SIGNIN:
      return {
        ...state,
        signIn: action.email,
      };
    case SIGNOUT:
      return {
        ...state,
        signIn: "",
      };
    case GET_MOVIEPICK_SUCCESS:
      return {
        ...state,
        moviePick: [...action.users.items],
      };
    case GET_MOVIEPICK_SUCCESS_TWO:
      return {
        ...state,
        moviePickTwo: [...action.users.items],
      };
    case GET_MOVIELIST_SUCCESS:
      return {
        ...state,
        movieList: [...action.users.items],
      };
    case GET_SINGLEMOVIE_SUCCESS:
      return {
        ...state,
        singleMovie: {
          ...state.singleMovie,
          data: action.users.data,
          images: action.users.images,
          trailer: action.users.trailer,
        },
      };
    case GET_SEARCHMOVIE:
      return {
        ...state,
        search: {
          ...state.search,
          loading: true,
        },
      };

    case GET_SEARCHMOVIE_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          searchResults: action.users.results,
          loading: false,
        },
      };

    case GET_MOVIEPICK_ERROR:
    case GET_MOVIEPICK_ERROR_TWO:
    case GET_MOVIELIST_ERROR:
    case GET_SEARCHMOVIE_ERROR:
    case GET_SINGLEMOVIE_ERROR:
    case GET_SEARCHMOVIE_ERROR:
      return {
        ...state,
        error: action.error,
        search: {
          ...state.search,
          loading: false,
        },
      };

    default:
      return state;
  }
}

//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload.main, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//     return nextState;
//   } else if (action.type === NAVBARTOGGLED)
//     return {
//       ...state,
//       navbarOpened: !state.navbarOpened,
//     };
//   else if (action.type === SIGNIN)
//     return {
//       ...state,
//       signIn: action.email,
//     };
//   else if (action.type === SIGNOUT)
//     return {
//       ...state,
//       signIn: "",
//     };
//   else if (action.type === GET_MOVIEPICK_SUCCESS)
//     return {
//       ...state,
//       moviePick: [...action.users.items],
//     };
//   else if (action.type === GET_MOVIEPICK_SUCCESS_TWO)
//     return {
//       ...state,
//       moviePickTwo: [...action.users.items],
//     };
//   else if (action.type === GET_MOVIELIST_SUCCESS)
//     return {
//       ...state,
//       movieList: [...action.users.items],
//     };
//   else if (action.type === GET_SINGLEMOVIE_SUCCESS)
//     return {
//       ...state,
//       singleMovie: {
//         ...state.singleMovie,
//         data: action.users.data,
//         images: action.users.images,
//         trailer: action.users.trailer,
//       },
//     };
//   else if (action.type === GET_SEARCHMOVIE)
//     return {
//       ...state,
//       search: {
//         ...state.search,
//         loading: true,
//       },
//     };
//   else if (action.type === GET_SEARCHMOVIE_SUCCESS)
//     return {
//       ...state,
//       search: {
//         ...state.search,
//         searchResults: action.users.results,
//         loading: false,
//       },
//     };
//   else {
//     return state;
//   }
// }
