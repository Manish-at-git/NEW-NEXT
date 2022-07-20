import React from "react";
import Container from "react-bootstrap/Container";
import styles from "./NavLink.module.css";

import { Movies, TV, Awards } from "../../../Constants";
import { navbarToggle } from "../../../redux/actions/index";

import LogoNavbarLink from "../../../assests/images/LogoNavbarLink.png";
import CloseButton from "../../../assests/images/CloseButton.png";

import Links from "./Links/Links";
import Image from "next/image";

import { useDispatch } from "react-redux";

function NavLinks() {
  const dispatch = useDispatch();

  const CloseNavbar = () => {
    dispatch(navbarToggle());
  };

  return (
    <Container className={styles.NavLinks}>
      <div className={styles.NavLinkLogo}>
        <Image src={LogoNavbarLink} alt="logo" />
        <span className={styles.CloseButton}>
          <Image src={CloseButton} alt="Close" onClick={CloseNavbar} />
        </span>
      </div>
      <div className={styles.LinkCards}>
        <Links title="Movies" List={Movies} />
        <Links title="TV Shows" List={TV} />
        <Links title="Awards" List={Awards} />
      </div>
    </Container>
  );
}

export default NavLinks;
