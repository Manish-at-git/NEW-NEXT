import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "react-bootstrap";
import styles from "../../styles/SingleMovie.module.css";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";

import { wrapper } from "../../redux/store";
import { END } from "redux-saga";
import { getSingleMovie } from "../../redux/actions/index";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faStar as solidStar,
  faChartLine,
  faImages,
  faFilm,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

function SingleMovie() {
  const [userLogged, setUserLogged] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("");
  const data = useSelector((state) => state.main.singleMovie);
  const error = useSelector((state) => state.main.error);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);

  const watchlist = (user) => {
    if (userLogged != undefined) {
      let localStorageList =
        JSON.parse(localStorage.getItem(userLogged?.email)) || [];
      let duplicate = false;
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
      router.push("/register");
    }
  };

  return (
    <>
      {error == "" ? (
        <>
          <Container fluid className={styles.SingleMovieMain1}>
            <Container className={styles.SingleMovie}>
              <Alert
                show={show}
                variant={variant}
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>{message}</Alert.Heading>
              </Alert>
              <div className={styles.SingleMovieHeading}>
                <div className={styles.SingleMovieHeadingTitle}>
                  <h1>{data && data.data.title}</h1>
                </div>
                <div className={styles.SingleMovieHeadingInfo}>
                  <div className={styles.Heading}>
                    <span className={styles.Block}>IMDB RATING</span>
                    <span className={styles.Block}>
                      <FontAwesomeIcon
                        icon={solidStar}
                        size="lg"
                        style={{ color: "#f5c518" }}
                      />
                      <span className={styles.Rating}>
                        <span className={styles.BoldLarge}>
                          {data && data.data.imDbRating}
                        </span>
                        /10
                      </span>
                    </span>
                  </div>
                  <div className={styles.Heading}>
                    <span className={styles.Block}>YOUR RATING</span>
                    <span className={styles.Block}>
                      <FontAwesomeIcon
                        icon={thinStar}
                        size="lg"
                        style={{ color: "#5799ef" }}
                      />
                      <span
                        className={styles.Rating}
                        style={{ color: "#5799ef" }}
                      >
                        {" "}
                        Rate
                      </span>
                    </span>
                  </div>
                  <div className={styles.Heading}>
                    <span className={styles.Block}>POPULARITY</span>
                    <span className={styles.Block}>
                      <FontAwesomeIcon
                        icon={faChartLine}
                        size="lg"
                        style={{ color: "green" }}
                      />
                      <span className={styles.Rating}>
                        {data && data.data.imDbRating}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.SingleMovieCard}>
                <div className={(styles.CardElement, styles.SingleMoviePoster)}>
                  {Object.keys(data?.data).length !== 0 && (
                    <Image src={data.data.image} alt="poster" layout="fill" />
                  )}
                </div>
                <div
                  className={(styles.CardElement, styles.SingleMovieTrailer)}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <iframe
                      style={{ width: "100%", height: "100%" }}
                      src={data && data.trailer}
                    ></iframe>
                  </div>
                </div>
                <div className={styles.SingleMovieMedia}>
                  <div className={styles.SingleMovieImages}>
                    <FontAwesomeIcon
                      className={styles.Icons}
                      icon={faImages}
                      size="lg"
                      style={{ color: "white" }}
                    />
                    <small>Images</small>
                  </div>
                  <div className={styles.SingleMovieImages}>
                    <FontAwesomeIcon
                      className={styles.Icons}
                      icon={faFilm}
                      size="lg"
                      style={{ color: "white" }}
                    />
                    <small>Videos</small>
                  </div>
                </div>
              </div>
              <div className={styles.Info}>
                <div
                  className={styles.SingleMovieInfo}
                  style={{ width: "60%" }}
                >
                  <div className={styles.Categories}>
                    {data.data.genreList &&
                      data.data.genreList.map((item, id) => (
                        <span key={id} className={styles.CategoriesAction}>
                          {item.value}
                        </span>
                      ))}
                  </div>
                  <div className={styles.Description}>
                    {data && data.data.plot}
                  </div>
                  <hr className={styles.DescriptionLine} />
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Director</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.directors}
                    </span>
                  </div>
                  <hr className={styles.DescriptionLine} />
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Writer</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.writers}{" "}
                    </span>
                  </div>
                  <hr className={styles.DescriptionLine} />
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Stars</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.stars}{" "}
                    </span>
                  </div>
                </div>
                <div className={styles.WatchlistBookmark}>
                  <div className={styles.SeeShowtime}>
                    <FontAwesomeIcon icon={faPlus} size="md" />
                    {"  "}
                    See Showtime
                  </div>
                  <div
                    className={styles.Watchlist}
                    onClick={() => watchlist(data.data)}
                  >
                    <span>
                      <FontAwesomeIcon icon={faPlus} size="md" />
                      Add to Watchlist{" "}
                    </span>
                    <FontAwesomeIcon icon={faAngleDown} size="md" />
                  </div>
                  <div className={styles.BookmarkDown}>
                    <span>
                      <b>
                        <span className={styles.BoldLarge}>2.1K</span>
                      </b>
                      User reviews
                    </span>
                    <span>
                      <b>
                        <span className={styles.BoldLarge}>320</span>
                      </b>
                      Critic reviews
                    </span>
                    <span>
                      <b>
                        <span
                          className={styles.BoldLarge}
                          style={{ backgroundColor: "green", color: "white" }}
                        >
                          {data && data.data.metacriticRating}
                        </span>
                      </b>
                      Metascore
                    </span>
                  </div>
                </div>
              </div>
            </Container>
          </Container>
          <Container fluid style={{ background: "white" }}>
            <Container
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Container className={styles.SingleMovieMain2}>
                <div>
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    {Object.keys(data.images).length !== 0 &&
                      data.images.slice(0, 10).map((item, id) => (
                        <SwiperSlide key={id}>
                          <div className={styles.SliderImage}>
                            <Image
                              src={item.image}
                              width={175}
                              height={175}
                              alt=""
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>

                <div>
                  <div className={styles.GridCast}>
                    {data?.data?.actorList?.slice(0, 8).map((item, id) => (
                      <div
                        key={id}
                        style={{
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div className={(styles.CastItem, styles.Inline)}>
                          <Image
                            src={item.image}
                            alt=""
                            height={100}
                            width={100}
                            style={{
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div
                          className={(styles.CastItem, styles.Inline)}
                          style={{ padding: "0 20px" }}
                        >
                          <div className={styles.CastName}>{item.name}</div>
                          <div className={styles.CastDesc}>
                            {item.asCharacter.slice(0, 40)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Container>
                  <hr className={styles.DescriptionLine} />{" "}
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Director</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.directors}
                    </span>
                  </div>
                  <hr className={styles.DescriptionLine} />{" "}
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Writer</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.writers}
                    </span>
                  </div>
                  <hr className={styles.DescriptionLine} />{" "}
                  <div className={styles.Director}>
                    <span className={styles.DirectorBold}>Stars</span>
                    <span className={styles.DirectorBlue}>
                      {" "}
                      {data && data.data.stars}
                    </span>
                  </div>
                </Container>
              </Container>
              <div className={styles.SingleSidebar}>
                {data?.data?.similars?.slice(0, 8).map((item, id) => (
                  <Link
                    key={id}
                    href={{
                      pathname: `/SingleMovie/${item.id}`,
                    }}
                  >
                    <a className={styles.SearchLink}>
                      <div className={styles.SingleSidebarBox}>
                        <div className={styles.WatchedSeries}>
                          <small className={styles.WatchedSeriesSpan}>
                            {item.title}
                          </small>
                          <small className={styles.CreatedYearSpan}>
                            {item.imDbRating}
                          </small>
                        </div>
                        <Image
                          src={item.image}
                          alt=""
                          height={75}
                          width={60}
                          className={styles.CreatedYear}
                        />
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </Container>
          </Container>
        </>
      ) : (
        <div
          style={{
            paddingTop: "300px",
            fontSize: "22px",
            height: "200px",
            width: "100%",
            color: "red",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}
    </>
  );
}

export default SingleMovie;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getSingleMovie(context.query.SingleMovie));
    store.dispatch(END);
    await store.sagaTask.toPromise();
  }
);
