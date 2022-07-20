import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Watchlist.module.css";

import share from "../assests/images/share.png";

import Categories from "../components/MovieList/Categories/Categories";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

function Watchlist() {
  const signedIn = useSelector((state) => state.main.signIn);
  const [userLogged, setUserLogged] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);
  let localStorageList;
  if (typeof window !== "undefined") {
    localStorageList =
      JSON.parse(localStorage.getItem(userLogged?.email)) || [];
  }
  return (
    <div className={styles.MovieList}>
      <Container className={styles.MovieListContainer}>
        <div className={styles.MovieListMain}>
          <div className={styles.MovieListPage}>
            <div className={styles.MovieListHeaderpage}>
              <div className={styles.MovieListHead}>
                <h5>IMDb Charts</h5>
                <h3 className={styles.MovieListHeader}>IMDb Watchlist</h3>
                <small className={styles.MovieListByline}>
                  IMDb Watchlist as rated by regular IMDb voters.
                </small>
              </div>
              <div className={styles.Image}>
                <Image src={share} alt="share" />
              </div>
            </div>
            <hr />

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

                  {typeof window !== "undefined"
                    ? localStorageList.map((user) => (
                        <tr className={styles.tr} key={user.id}>
                          <td style={{ display: "flex", alignItems: "center" }}>
                            <Image
                              src={user.image}
                              alt="poster"
                              width={50}
                              height={70}
                            />
                            <small className={styles.TableRow}>
                              {user.rank
                                ? user.rank
                                : Math.ceil(user.imDbRating)}
                              .{" "}
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
                              icon={faCheck}
                              style={{ color: "grey", cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))
                    : null}
                </table>
              </div>
            </div>
          </div>
          <Categories />
        </div>
      </Container>
    </div>
  );
}

export default Watchlist;
