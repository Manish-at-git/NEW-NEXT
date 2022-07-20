import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import NavbarLinks from "./NavbarLink/NavLinks";

import { useDispatch, useSelector } from "react-redux";
import {
  getSearchMovie,
  navbarToggle,
  loadSignOut,
} from "../../redux/actions/index";

import { debounce } from "lodash";
import { auth } from "../../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookmark,
  faCaretDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "../../assests/images/logo.png";
import NavbarLogo2 from "../../assests/images/NavbarLogo2.png";

import styles from "./Navbar.module.css";
import { Container } from "react-bootstrap";
import Search from "../Search/Search";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const navbarData = useSelector((state) => state.main.navbarOpened);

  const [search, setSearch] = useState("");
  const [userLogged, setUserLogged] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);

  const changeState = () => {
    dispatch(navbarToggle());
  };

  const handleChange = debounce((event) => {
    setSearch(event.target.value);
    dispatch(getSearchMovie(event.target.value));
  }, 1000);

  const logout = async () => {
    await signOut(auth);
    router.push("/register");
  };

  return (
    <>
      <Container fluid className={styles.NavbarMain}>
        <Container className={styles.Navbar}>
          <Link href="/">
            <a className={styles.Logo}>
              <Image src={Logo} alt="IMDb Logo" />
            </a>
          </Link>
          <span className={styles.Menu} onClick={changeState}>
            <FontAwesomeIcon icon={faBars} className={styles.NavIcons} />
            Menu
          </span>
          <span className={styles.Search}>
            <input
              id="search-input"
              className={styles.SearchInput}
              type="text"
              placeholder="Search IMDb"
              onChange={handleChange}
            />
            {search && (
              <FontAwesomeIcon
                icon={faXmark}
                className={styles.iconss}
                onClick={() => {
                  setSearch("");
                  document.querySelector("#search-input").value = "";
                }}
              />
            )}
          </span>
          <span className={styles.Logo}>
            <Image src={NavbarLogo2} alt="IMDb Logo" />
          </span>
          <div className={styles.VerticleLine}></div>

          {userLogged == undefined ? (
            <Link href="/register">
              <a className={styles.Watchlist}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={styles.NavIcons}
                />
                Watchlist
              </a>
            </Link>
          ) : (
            <Link href="/watchlist">
              <a className={styles.Watchlist}>
                <FontAwesomeIcon
                  icon={faBookmark}
                  className={styles.NavIcons}
                />
                Watchlist
              </a>
            </Link>
          )}

          {userLogged == undefined ? (
            <Link href="/register">
              <a className={styles.SignIn}> Sign In</a>
            </Link>
          ) : (
            <button
              className={styles.SignIn}
              onClick={() => {
                logout();
                dispatch(loadSignOut());
              }}
            >
              Sign Out
            </button>
          )}

          <span className={styles.Lang}>
            EN
            <FontAwesomeIcon icon={faCaretDown} className={styles.NavIcons} />
          </span>
        </Container>
        {navbarData && <NavbarLinks />}
      </Container>
      {search && <Search />}
    </>
  );
}

export default Navbar;
