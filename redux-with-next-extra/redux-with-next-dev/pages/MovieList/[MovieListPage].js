import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { NavRoutes } from "../../Constants";
import Categories from "../components/MovieList/Categories/Categories";

import Container from "react-bootstrap/Container";
import styles from "../styles/MovieList.module.css";
import share from "../assests/images/share.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { auth } from "../../firebase/firebase-config";

import { useSelector } from "react-redux";
import { wrapper } from "../../redux/store";
import { END } from "redux-saga";
import { getMovieList } from "../../redux/actions/index";
import { onAuthStateChanged } from "firebase/auth";

function MovieListPage(props) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const [userLogged, setUserLogged] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setsortDirection] = useState("Ranking");

  const List = useSelector((state) => state.main.movieList);
  const error = useSelector((state) => state.main.error);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);

  const watchlist = (user, e) => {
    if (userLogged != undefined) {
      e.preventDefault();
      if (typeof window !== "undefined") {
        let duplicate = false;
        let localStorageList =
          JSON.parse(localStorage.getItem(userLogged?.email)) || [];

        localStorageList.forEach((item) => {
          if (item.id === user.id) {
            duplicate = true;
          }
        });

        if (duplicate === false) {
          localStorageList.push(user);
          localStorage.setItem(
            userLogged?.email,
            JSON.stringify(localStorageList)
          );
          setMessage("Added to Watchlist");
          setVariant("success");
          setShow(true);
        } else {
          setMessage("Movie Already Exist");
          setVariant("danger");
          setShow(true);
        }
      } else {
        console.log("App is running on the server");
      }
    } else {
      router.push("/register");
    }
  };

  const sortByYear = (e) => {
    const sortDirection = e.target.value;
    setsortDirection(sortDirection);
  };

  const CategorySort = List.sort((a, b) => {
    if (sortDirection === "Ranking") {
      return a.rank - b.rank;
    } else if (sortDirection === "Rating") {
      return b.imDbRating - a.imDbRating;
    } else {
      return a.year - b.year;
    }
  }).filter((user) => {
    if (searchTerm == "") {
      return user;
    } else if (
      user.title.trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
    ) {
      return user;
    }
  });

  const title = router.query.title;

  return (
    <div className={styles.MovieList}>
      <Container className={styles.MovieListContainer}>
        {error == "" ? (
          <div className={styles.MovieListMain}>
            <div className={styles.MovieListPage}>
              <Alert
                show={show}
                variant={variant}
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
              <div className={styles.MovieListHeaderpage}>
                <div className={styles.MovieListHead}>
                  <h5>IMDb Charts </h5>
                  <h3 className={styles.MovieListHeader}>IMDb {title}</h3>
                  <small className={styles.MovieListByline}>
                    IMDb {title} as rated by regular IMDb voters.
                  </small>
                </div>
                <div className={styles.Image}>
                  <Image src={share} alt="share" />
                </div>
              </div>
              <hr className={styles.Hr} />
              <div className={styles.MovieListLowerHeader}>
                <div className={styles.MovieListTitle}>
                  <small className={styles.Showing}>Showing {title}</small>
                </div>
                <div className={styles.MovieListSort}>
                  <label htmlFor={"sort"}>Sort by : </label>
                  <select
                    name="sort"
                    id="sort"
                    form="sortform"
                    onChange={sortByYear}
                  >
                    <option value="Ranking">Ranking</option>
                    <option value="Release">Release</option>
                    <option value="Rating">Rating</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search Here"
                    id="search_input"
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              </div>
              <div className={styles.MovieListList}>
                <div>
                  <table className={styles.Table}>
                    <tr className={styles.tr} style={{ border: "none" }}>
                      <th
                        className={styles.th}
                        style={{
                          width: "70%",
                          fontSize: "0.8rem",
                          paddingLeft: "60px",
                        }}
                      >
                        Rank & Title
                      </th>
                      <th
                        className={styles.th}
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        <span>
                          <span className={styles.YourRating}>IMDb</span>
                          <span className={styles.YourRating}>Rating</span>
                        </span>
                      </th>
                      <th
                        className={styles.th}
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        <span>
                          <span className={styles.YourRating}>Your</span>
                          <span className={styles.YourRating}>Rating</span>
                        </span>
                      </th>
                      <th className={styles.th}></th>
                    </tr>
                    {CategorySort &&
                      CategorySort.map((user) => (
                        <tr className={styles.tr} key={user.id}>
                          <td style={{ display: "flex", alignItems: "center" }}>
                            <Image
                              src={user.image}
                              alt="poster"
                              width={50}
                              height={70}
                            />
                            <small className={styles.TableRow}>
                              {user.rank}.{" "}
                              <Link
                                href={{
                                  pathname: `/SingleMovie/${user.id}`,
                                }}
                              >
                                <a className={styles.MovieListLink}>
                                  <span className={styles.BlueName}>
                                    {user.title}
                                  </span>
                                </a>
                              </Link>
                              <small
                                style={{ fontSize: "0.9em" }}
                              >{`(${user.year})`}</small>
                            </small>
                          </td>
                          <td
                            className={styles.FontSize}
                            style={{
                              fontSize: "0.8rem",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={solidStar}
                              style={{
                                color: "#f5c518",
                                padding: "0 5px",
                              }}
                              size="lg"
                            />
                            <b>{user.imDbRating}</b>
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={thinStar}
                              style={{ color: "grey", opacity: "0.5" }}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faPlus}
                              style={{ color: "grey", cursor: "pointer" }}
                              onClick={(e) => watchlist(user, e)}
                            />
                          </td>
                        </tr>
                      ))}
                  </table>
                </div>
              </div>
            </div>
            <Categories />
          </div>
        ) : (
          <div
            style={{
              paddingTop: "300px",
              fontSize: "22px",
              height: "100vh",
              width: "100%",
              color: "red",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </Container>
    </div>
  );
}

export default MovieListPage;

export async function getStaticPaths() {
  const path = NavRoutes.map((post) => {
    return {
      params: { MovieListPage: post.url.toString() },
    };
  });

  return {
    paths: path,
    fallback: false,
  };
}

// export async function getStaticProps(context) {
//   const MovieListPage = context.params.MovieListPage;
//   const res = await fetch(
//     `https://imdb-api.com/en/API/${MovieListPage}/k_nrcppo4w`
//   );
//   const posts = await res.json();
//   return {
//     props: {
//       posts,
//     },
//   };
// }

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (context) => {
    const MovieListPage = context.params.MovieListPage;
    store.dispatch(getMovieList(MovieListPage));
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);
