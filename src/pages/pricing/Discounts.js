import "./AcademyPrices.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { getAcademies, getSports } from "../../functions/getter";
import DisplayDiscount from "../../components/datatable/DisplayDiscount";

export default function AcademyPrices() {
  const [academies, setAcademies] = useState({});
  const [selectedAcademyID, setSelectedAcademyID] = useState("");
  const [selectedButton, setselectedButton] = useState("");

  const onButtonSelect = (buttonValue) => {
    setselectedButton(buttonValue);
  };

  const handleChange = (event) => {
    setSelectedAcademyID(event.target.value);
  };

  const renderTable = (selectedButton) => {
    console.log(selectedButton);
    switch (selectedButton) {
      case "Tennis":
        return (
          <DisplayDiscount
            payments={academies[selectedAcademyID].payments}
            selectedAcademyID={selectedAcademyID}
          />
        );

      default:
        return <div>Select any button to show data</div>;
    }
  };

  useEffect(() => {
    getAcademies().then((academy) => setAcademies(academy));
  }, []);

  return (
    <>
      <Navbar />
      <section>
        <div>
          <form className="form">
            <label>Academy:</label>
            <select onChange={handleChange}>
              <option value="Academies">Academies</option>
              {Object.keys(academies).map((academyId) => (
                <option value={academyId} key={academyId}>
                  {academies[academyId].name}
                </option>
              ))}
            </select>
          </form>
        </div>

        {selectedAcademyID ? (
          <button
            className=""
            onClick={() => onButtonSelect(academies[selectedAcademyID].sports)}
          >
            {academies[selectedAcademyID].sports}
          </button>
        ) : (
          <div></div>
        )}

        <div className="center">{renderTable(selectedButton)}</div>
      </section>
    </>
  );
}
