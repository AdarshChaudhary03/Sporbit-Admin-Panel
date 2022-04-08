import React, { useEffect, useState, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../configs/firebaseConfig";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [emails, setEmails] = useState({});
  const [initializing, setInitializing] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const getEmails = async () => {
    let tempEmails = {};
    await firebaseConfig
      .firestore()
      .collection("dashboardAuth")
      .get()
      .then((querySnapshot) => {
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
    Object.keys(emails).forEach((emailId) => {
      if (currentUser.email === emails[emailId].email) {
        console.log(currentUser.email);
        mail = currentUser.email;
      }
    });
    return mail;
  }

  useEffect(() => {
    getEmails().then(() => setInitializing(true));
  }, []);

  if (!initializing) {
    return <div></div>;
  } else
    return (
      <Route
        {...rest}
        render={(props) =>
          currentUser.email === getMail() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;
