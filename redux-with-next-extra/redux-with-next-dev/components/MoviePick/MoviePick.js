import React from "react";
import Link from "next/link";

import WhatToWatch from "../WhatToWatch/WhatToWatch";
import Cards from "../Cards/Card";

import Container from "react-bootstrap/Container";
import styles from "./MoviePick.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useSelector } from "react-redux";

function MoviePick(props) {
  const MoviesListOne = useSelector((state) => state.main.moviePick);
  const MoviesListTwo = useSelector((state) => state.main.moviePickTwo);
  const error = useSelector((state) => state.main.error);

  const { heading, recommend, title, text, data, color } = props;

  let MovieList;
  if (data === "Two") {
    MovieList = MoviesListTwo;
  } else {
    MovieList = MoviesListOne;
  }

  return (
    <Container fluid style={{ background: "black" }}>
      <Container className={styles.MoviePick}>
        <div className={styles.MoviePickHeading}>
          <WhatToWatch
            heading={heading}
            recommend={recommend}
            title={title}
            text={text}
            color={color}
          />

          {error == "" ? (
            <div className={styles.MoviePickCards}>
              <Swiper
                slidesPerView={5}
                spaceBetween={0}
                slidesPerGroup={2}
                loop={false}
                loopFillGroupWithBlank={false}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {MovieList?.slice(0, 20).map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link
                      href={{
                        pathname: `/SingleMovie/${item.id}`,
                      }}
                    >
                      <a>
                        <Cards item={item} />
                      </a>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div style={{ color: "red", textAlign: "center" }}>{error}</div>
          )}
        </div>
      </Container>
    </Container>
  );
}

export default MoviePick;
