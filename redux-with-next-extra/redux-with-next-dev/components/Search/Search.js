import React from "react";
import BeatLoader from "react-spinners/BeatLoader";

import styles from "./Search.module.css";

import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import Link from "next/link";
import Image from "next/image";

function Search() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const isLoading = useSelector((state) => state.main.search.loading);
  const searchdata = useSelector((state) => state.main.search.searchResults);
  const error = useSelector((state) => state.main.error);

  return (
    <Container className={styles.SearchPop}>
      {isLoading ? (
        <div
          style={{
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BeatLoader color="#f5c518" cssOverride={override} size={15} />
        </div>
      ) : error == "" ? (
        searchdata?.length ? (
          searchdata.map((item) => (
            <>
              <Row>
                <Col lg={1} className={styles.SearchFloatImage}>
                  <div
                    className={styles.WhiteName}
                    style={{ height: "70px", width: "50px" }}
                  >
                    <Image src={item.image} alt="poster" layout="fill" />
                  </div>
                </Col>
                <Col lg={11} className={styles.SearchFloatContent}>
                  <Link
                    href={{
                      pathname: `/SingleMovie/${item.id}`,
                    }}
                    key={item.id}
                  >
                    <a className={styles.SearchLink}>{item.title}</a>
                  </Link>
                  <div>{item.description}</div>
                </Col>
              </Row>
              <hr className={styles.SearchHr} />
            </>
          ))
        ) : (
          console.log("error")
        )
      ) : (
        <Row
          style={{
            height: "150px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        </Row>
      )}
    </Container>
  );
}

export default Search;
