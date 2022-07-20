import React from "react";

import styles from "./SignIn.module.css";
import Container from "react-bootstrap/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import WhatToWatch from "../WhatToWatch/WhatToWatch";
import Link from "next/link";

function SignIn() {
  return (
    <Container fluid className={styles.LoginMain}>
      <Container>
        <div className={styles.LoginChild}>
          <WhatToWatch
            heading=""
            recommend=""
            title="Sign In"
            text="Sign In to access your account"
            color="black"
          />
          <Container className={styles.LoginContainer}>
            <FontAwesomeIcon icon={faAdd} className={styles.LoginIcon} />
            <div className={styles.SignInToWatchlist}>
              Sign in to access your Watchlist
            </div>
            <div className={styles.SaveShowsAndMovies}>
              Save shows and movies to keep track of what you want to watch.
            </div>
            <Link
              href={{
                pathname: `/`,
              }}
            >
              <a className={styles.SignInToIMDb}>Sign in to IMDb</a>
            </Link>
          </Container>
        </div>
      </Container>
    </Container>
  );
}

export default SignIn;
