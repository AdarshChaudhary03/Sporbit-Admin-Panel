import React, { useState, useEffect } from "react";
import firebaseConfig from "../../configs/firebaseConfig";
import { getResidents } from "../../functions/getter";
import DisplayResidents from "../datatable/DisplayResidents";

function ShowSocietyDetails({ selectedSocietyID, socities }) {
  const [residents, setResidents] = useState({});

  const [values, setValues] = useState({
    name: "",
    address: "",
    description: "",
  });

  const { name, address, description } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });

    firebaseConfig
      .firestore()
      .collection(`socities`)
      .doc(selectedSocietyID)
      .update({
        name: name,
        address: address,
        briefDescription: description,
      });
  };

  useEffect(() => {
    setValues({
      ...values,
      name: socities[selectedSocietyID].name,
      description: socities[selectedSocietyID].briefDescription,
      address: socities[selectedSocietyID].address,
    });
    getResidents(selectedSocietyID).then((residents) =>
      setResidents(residents)
    );
  }, [residents, selectedSocietyID]);

  return (
    <section>
      <div className="societyDetails">
        <div className="left">
          <img
            src={socities[selectedSocietyID].profileImage}
            alt="Avatar"
            width="100"
            height="100"
          />

          <div className="form-group">
            Name:
            <input
              onChange={handleChange("name")}
              className="form-control"
              placeholder="Name"
              value={name}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div>
          <div className="form-group">
            Descr:
            <input
              onChange={handleChange("description")}
              className="form-control"
              placeholder="Description"
              value={description}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div>

          {/* <div className="right">
            <button onClick={changeVerification} className="publish-btn">
              {socities[selectedSocietyID].isVerified
                ? "Verified"
                : "Not Verified"}
            </button>
          </div> */}
        </div>
      </div>

      <DisplayResidents
        selectedSocietyID={selectedSocietyID}
        residents={residents}
      />
    </section>
  );
}

export default ShowSocietyDetails;
