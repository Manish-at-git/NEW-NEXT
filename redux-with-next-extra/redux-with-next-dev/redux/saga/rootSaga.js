import { all } from "redux-saga/effects";

import watchImagesLoad from "./saga";

export default function* rootSaga() {
  yield all([watchImagesLoad()]);
}
