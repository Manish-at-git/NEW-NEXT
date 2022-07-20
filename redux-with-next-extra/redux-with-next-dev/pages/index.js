import { getMoviePickTwo, getMoviePick } from "../redux/actions/index";
import { useSelector } from "react-redux";
import { wrapper } from "../redux/store";
import { END } from "redux-saga";

import MoviePick from "../components/MoviePick/MoviePick";
import SignIn from "../components/SignIn/SignIn";

function Home() {
  const navbarData = useSelector((state) => state.main.navbarOpened);
  return (
    <>
      {!navbarData && (
        <div>
          <MoviePick
            heading="What To Watch"
            recommend="Get More Recommendations"
            title="In Theatures"
            text="TV Shows and Movies just for you"
            data="Two"
            color=""
          />
          <MoviePick
            heading=""
            recommend=""
            title="Top Movies"
            text="TV Shows and Movies just for you"
            data=""
            color="black"
          />
          <SignIn />
        </div>
      )}
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(getMoviePick());
  store.dispatch(getMoviePickTwo());
  store.dispatch(END);
  await store.sagaTask.toPromise();
});

export default Home;
