import React, { useState, useEffect } from "react";
import "./Socities.css";
import Navbar from "../../components/navbar/Navbar";
import { getSocities, getResidents } from "../../functions/getter";

import ShowSocietyDetails from "../../components/showdetails/ShowSocietyDetails";

export default function Socities() {
  const [socities, setSocities] = useState({});

  const [selectedsocietyID, setSelectedsocietyID] = useState("");

  const handleChange = (event) => {
    setSelectedsocietyID(event.target.value);
  };

  useEffect(() => {
    getSocities().then((society) => setSocities(society));
  }, []);

  return (
    <>
      <Navbar />
      <section id="showDetails">
        <div>
          <p>List of Socities</p>

          <form className="form">
            <label>Choose a Society:</label>
            <select onChange={handleChange}>
              <option value="Socities"></option>
              {Object.keys(socities).map((societyId) => (
                <option value={societyId} key={societyId}>
                  {socities[societyId].name}
                </option>
              ))}
            </select>
          </form>

          {selectedsocietyID ? (
            <ShowSocietyDetails
              selectedSocietyID={selectedsocietyID}
              socities={socities}
            />
          ) : (
            <div>No data to show</div>
          )}
        </div>
      </section>
    </>
  );
}
