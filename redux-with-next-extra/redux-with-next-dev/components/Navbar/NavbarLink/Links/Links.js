import React from "react";

import Container from "react-bootstrap/Container";
import styles from "./Links.module.css";

import Link from "next/link";
import { useDispatch } from "react-redux";
import { navbarToggle } from "../../../../redux/actions/index";

function Links(props) {
  const dispatch = useDispatch();

  const { title, List } = props;

  return (
    <Container className={styles.Link}>
      <h4 className={styles.Heading}>{title}</h4>

      {List.map((item, id) => (
        <Link
          href={{
            pathname: `MovieList/${item.url}`,
            query: { title: item.category },
          }}
          key={id}
        >
          <a className={styles.Links} onClick={() => dispatch(navbarToggle())}>
            {item.category}
          </a>
        </Link>
      ))}
    </Container>
  );
}

export default Links;
