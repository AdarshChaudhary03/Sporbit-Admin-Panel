import React, { useState, useEffect } from "react";
import "./PayandPlat.css";
import ShowPayandPlayDetails from "../../components/showdetails/ShowPayandPlayDetails";
import Navbar from "../../components/navbar/Navbar";
import { getFacilities } from "../../functions/getter";

export default function PayandPlay() {
  const [facilities, setFacilities] = useState({});
  const [selectedFacilityID, setSelectedFacilityID] = useState("");

  const handleChange = (event) => {
    setSelectedFacilityID(event.target.value);
  };

  useEffect(() => {
    getFacilities().then((facility) => setFacilities(facility));
  }, []);

  return (
    <>
      <Navbar />
      <section className="showDetails">
        <p>Bookings of Pay and Play</p>

        <form className="form">
          <label>Choose a facility:</label>
          <select onChange={handleChange}>
            <option value="Facilities">Facilities</option>
            {Object.keys(facilities).map((facilityId) => (
              <option value={facilityId} key={facilityId}>
                {facilities[facilityId].name}
              </option>
            ))}
          </select>

          {selectedFacilityID ? (
            <ShowPayandPlayDetails selectedFacilityID={selectedFacilityID} />
          ) : (
            <div></div>
          )}
        </form>
      </section>
    </>
  );
}
