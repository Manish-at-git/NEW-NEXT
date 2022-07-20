import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//CSS
import Card from "react-bootstrap/Card";
import styles from "./Card.module.css";

///ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as thinStar } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleInfo,
  faPlay,
  faPlus as Plus,
  faStar as solidStar,
} from "@fortawesome/free-solid-svg-icons";

///FIREBASE
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

function Cards(props) {
  const router = useRouter();
  const [userLogged, setUserLogged] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);

  const watchlist = (user, e) => {
    e.preventDefault();
    if (userLogged != undefined) {
      if (typeof window !== "undefined") {
        let duplicate = false;
        let localStorageList =
          JSON.parse(localStorage.getItem(userLogged?.email)) || [];
        localStorageList.forEach((item) => {
          if (item.id === user.id) {
            duplicate = true;
            let elem = document.getElementById(props.item.id);
            elem.style.display = "block";
            setTimeout(() => {
              elem.style.display = "none";
            }, 2000);
          }
        });
        if (duplicate === false) {
          localStorageList.push(user);
          localStorage.setItem(
            userLogged?.email,
            JSON.stringify(localStorageList)
          );
          let elem = document.getElementById(props.item.id + 1);
          elem.style.display = "block";
          setTimeout(() => {
            elem.style.display = "none";
          }, 2000);
        }
      } else {
        console.log("App running on server");
      }
    } else {
      router.push("/register");
    }
  };

  return (
    <div className={styles.AppCard}>
      <span
        id={props.item.id}
        style={{
          display: "none",
          color: "#f5c518",
          textAlign: "center",
          padding: "5px 0",
        }}
      >
        Movie Already Exist
      </span>
      <span
        id={props.item.id + 1}
        style={{
          display: "none",
          color: "#f5c518",
          textAlign: "center",
          padding: "5px 0",
        }}
      >
        Movie Added
      </span>
      <Card className={styles.Cards}>
        <Card.Img
          variant="top"
          src={props.item.image}
          className={styles.CardImg}
        />
        <span
          className={styles.addBookmarkSpan}
          onClick={(e) => watchlist(props.item, e)}
        >
          <FontAwesomeIcon
            icon={Plus}
            size="lg"
            className={styles.addBookmark}
          />
        </span>

        <Card.Body className={styles.CardBody}>
          <Card.Text className={styles.Rating}>
            <span className={styles.icons}>
              <FontAwesomeIcon
                icon={solidStar}
                className={styles.IconsRating}
              />
              {props.item.imDbRating}
            </span>
            <span className={styles.Thin}>
              <FontAwesomeIcon
                icon={thinStar}
                className={styles.iconsRatingThin}
              />
            </span>
          </Card.Text>
          <Card.Title className={styles.Title}>{props.item.title}</Card.Title>
          <Card.Text className={styles.WatchOptions}>
            <FontAwesomeIcon
              icon={Plus}
              style={{ paddingRight: "8px", backgroundColor: "transparent" }}
            />
            Watchlist
          </Card.Text>
          <Card.Text className={styles.Trailer}>
            <span className={styles.TrailerText}>
              <FontAwesomeIcon
                icon={faPlay}
                className={styles.TrailerTextIcon}
              />{" "}
              Trailer
            </span>
            <span className={styles.TrailerIcon}>
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Cards;
