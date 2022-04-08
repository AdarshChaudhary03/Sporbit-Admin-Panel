import React, { useState, useEffect } from "react";
import firebaseConfig from "../../configs/firebaseConfig";
import "./Academies.css";
import ShowAcademyDetails from "../../components/showdetails/ShowAcademyDetails";
import Navbar from "../../components/navbar/Navbar";

import { getUsers, getAcademies } from "../../functions/getter";

export default function Academies() {
  const [academies, setAcademies] = useState({});
  const [selectedAcademyID, setSelectedAcademyID] = useState("");
  const [users, setUsers] = useState({});
  const [initializing, setInitializing] = useState(false);

  const handleChange = (event) => {
    setSelectedAcademyID(event.target.value);
  };

  useEffect(() => {
    getAcademies().then((academy) => setAcademies(academy));
    getUsers()
      .then((user) => setUsers(user))
      .then(() => setInitializing(true));
  }, []);

  if (!initializing) {
    return <div></div>;
  } else
    return (
      <>
        <Navbar />
        <section id="showDetails">
          <div>
            <p>List of Academies</p>

            <form className="form">
              <label>Choose a Academy:</label>
              <select onChange={handleChange}>
                <option value="Academies">Academies</option>
                {Object.keys(academies).map((academyId) => (
                  <option value={academyId} key={academyId}>
                    {academies[academyId].name}
                  </option>
                ))}
              </select>
            </form>

            {selectedAcademyID ? (
              <ShowAcademyDetails
                selectedAcademyID={selectedAcademyID}
                academies={academies}
              />
            ) : (
              <div>No data to show</div>
            )}
          </div>
        </section>
      </>
    );
}
