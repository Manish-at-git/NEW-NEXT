import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import styles from "../styles/SignIn.module.css";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

import { useDispatch } from "react-redux";
import { loadSignIn } from "../redux/actions/index";
import { useRouter } from "next/router";
import { wrapper } from "../redux/store";

let errorMsg;

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [userLogged, setUserLogged] = useState({});
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMEssage] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserLogged(user);
    });
  }, []);

  const showError = (error) => {
    let authError = error.message;
    let errorSplit = authError.split("/");
    let errorSplitString = errorSplit[1].toString();
    let errorMessageList = errorSplitString.split(")");
    errorMsg = errorMessageList[0].toString();
    setErrorMEssage(errorMsg);
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );

      setShow(false);
      router.push("/");
    } catch (error) {
      showError(error);
      setShow(true);
    }
  };

  return (
    <div className={styles.Auth}>
      <Container>
        <Row className={styles.AuthRow}>
          <Col lg={3}>
            <div className={styles.Authentication}>
              <div className={styles.Login}>
                <h5 className={styles.LoginUser}> Login </h5>
                <input
                  className={styles.AuthEmail}
                  placeholder="Email..."
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                />
                <input
                  className={styles.AuthPass}
                  placeholder="Password..."
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />

                <button
                  className={styles.AuthButton}
                  onClick={() => {
                    login();
                    dispatch(loadSignIn(userLogged?.email));
                  }}
                >
                  {" "}
                  Login
                </button>
              </div>

              <Alert show={show} variant="danger">
                <Alert.Heading>{errorMessage}</Alert.Heading>
              </Alert>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {});

export default SignIn;
