import "./home.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../auth/Auth";
import firebaseConfig from "../../configs/firebaseConfig";
import { Redirect } from "react-router-dom";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [emails, setEmails] = useState({});

  const getEmails = async () => {
    let tempEmails = {};
    await firebaseConfig
      .firestore()
      .collection(`dashboardAuth`)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        for (const docSnapshot of querySnapshot.docs) {
          tempEmails[docSnapshot.id] = {
            ...docSnapshot.data(),
            key: docSnapshot.id,
          };
        }
      })
      .then(() => {
        setEmails(tempEmails);
      });
  };

  function getMail() {
    let mail = "";
    console.log(emails);
    Object.keys(emails).forEach((emailId) => {
      if (currentUser.email === emails[emailId].email) {
        console.log(currentUser.email);
        mail = currentUser.email;
      }
    });
    console.log(mail);
    return mail;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email.value, password.value);
        console.log('Done..');
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getEmails();
  }, []);

  if (currentUser) {
    if (currentUser.email === getMail()) {
      return <Redirect to="/dashboard" />;
    } else {
      firebaseConfig
        .auth()
        .signOut()
        .catch((error) => {
          alert(error);
        });
      return <Redirect to="/" />;
    }
  }

  return (
    <>
      <div className="loginForm">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="box">
            <h1>Dashboard</h1>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="email"
            />

            <input
              type="password"
              name="password"
              placeholder="password"
              className="password"
            />

            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
