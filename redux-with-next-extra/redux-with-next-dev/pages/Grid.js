import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/Grid.module.css";

import Cards from "../components/Cards/Card";

import { useSelector } from "react-redux";

function Grid() {
  const router = useRouter();
  const Data = router.query.Container;

  const datalistOne = useSelector((state) => state.main.moviePick);
  const datalistTwo = useSelector((state) => state.main.moviePickTwo);
  const error = useSelector((state) => state.main.error);

  let datalist;
  if (Data === "Two") {
    datalist = datalistTwo;
  } else {
    datalist = datalistOne;
  }

  return (
    <div className={styles.GridMain}>
      <Container>
        <Row className={styles.GallaryContainer}>
          <h1 className={styles.GridHeading}>What to Watch</h1>
          {error == "" ? (
            <>
              {datalist &&
                datalist.map((item) => (
                  <Col className={styles.GridCard} key={item.id}>
                    <Link
                      href={{
                        pathname: `/SingleMovie/${item.id}`,
                      }}
                    >
                      <a className={styles.NavLink}>
                        <Cards item={item} />
                      </a>
                    </Link>
                  </Col>
                ))}
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
        </Row>
      </Container>
    </div>
  );
}

export default Grid;
