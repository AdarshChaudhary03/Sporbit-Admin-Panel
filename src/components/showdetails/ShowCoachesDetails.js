import React, { useState, useEffect } from "react";
import firebaseConfig from "../../configs/firebaseConfig";
import DisplayCoaches from "../datatable/DisplayCoaches";
import DisplayStudents from "../datatable/DisplayStudents";
import DisplayBatches from "../datatable/DisplayBatches";
import { getStudents, getCoaches, getBatches } from "../../functions/getter";

function ShowCoachesDetails({ selectedSportID, sports, selectedAcademyID, academies, coachesList, selectedCoachID }) {
  console.log("Sports"+sports);
  console.log("Academy"+academies);
  console.log("Coaches"+coachesList);
  console.log("Coach ID: "+selectedCoachID);
  const [students, setStudents] = useState({});
  const [batches, setBatches] = useState({});
  const [coaches, setcoaches] = useState({});
  const [selectedButton, setselectedButton] = useState("");
  const [descriptionEdits, setdescriptionEdits] = useState(
    coachesList[selectedCoachID].description    
    );

  const [values, setValues] = useState({
    name: "",
    description: "",
    designation: "",
    address: "",
    published: "",
  });

  const {
    name,
    description,
    designation,
    published,
    address,
  } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };


  const handleDescriptionEdits = (index, data) => {
    setdescriptionEdits((old) => {
      old[index] = data.target.value;
      return old;
    });
  };

  const changePublished = async () => {
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({ published: !academies[selectedAcademyID].published });
  };




  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values });

    firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        name: name,
        address: address,
        description: description,
        // location: location,
      })
      .then(() => {
        console.log("Submit");
      });
  };

  const editDescription = () => {
    firebaseConfig
      .firestore()
      .collection(`coaches`)
      .doc(selectedCoachID)
      .update({
        description: descriptionEdits,
      })
      .then(() => {
        console.log("Description edited");
      });
  };

  const deleteDescription = async (descriptionIndex) => {
    const descriptionArr = coaches[selectedCoachID].description;
    // const index = facilityArr.indexOf(facility);
    if (descriptionIndex > -1) {
      descriptionArr.splice(descriptionIndex, 1);
    }
    await firebaseConfig
      .firestore()
      .collection(`coaches`)
      .doc(selectedCoachID)
      .update({
        description: descriptionArr,
      });

    await setValues({
      ...values,
      description: "",
    });
  };

  const addDescription = async () => {
    const descriptions = coaches[selectedCoachID].description;
    descriptions.push(description);
    await firebaseConfig
      .firestore()
      .collection(`coaches`)
      .doc(selectedCoachID)
      .update({
        description: descriptions,
      });

    await setValues({
      ...values,
      facility: "",
    });
  };


  const onButtonSelect = (buttonValue) => {
    setselectedButton(buttonValue);
  };

  const renderTable = (selectedButton) => {
    switch (selectedButton) {
      case "students":
        return <DisplayStudents students={students} batches={batches} />;

      case "coaches":
        return <DisplayCoaches coaches={coaches} batches={batches} />;

      case "batches":
        return <DisplayBatches coaches={coaches} batches={batches} />;

      default:
        return <div>Select any button to show data</div>;
    }
  };

  useEffect(() => {
    getStudents(selectedAcademyID).then((student) => setStudents(student));
    getBatches(selectedAcademyID).then((batch) => setBatches(batch));
    getCoaches(selectedAcademyID).then((coach) => setcoaches(coach));

    setValues({
      ...values,
      name: academies[selectedAcademyID].name,
      description: academies[selectedAcademyID].description,
      address: academies[selectedAcademyID].address,
    });
  }, [selectedAcademyID]);

  return (
    <section>
      <div>
        <div className="left">
          <img
            src={coaches[selectedCoachID].profileImage}
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
            Designation:
            <input
              onChange={handleChange("designation")}
              className="form-control"
              placeholder="Designation"
              value={designation}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div>
          <div className="form-group">
            Address:
            <input
              onChange={handleChange("address")}
              className="form-control"
              placeholder="Address"
              value={address}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div>

        </div>
        <div className="right">
          <button onClick={changePublished} className="publish-btn">
            {academies[selectedAcademyID].published
              ? "Published"
              : "Unpublished"}
          </button>
          <h4>Coaches:{academies[selectedAcademyID].coaches.length}</h4>
          <h4>Students:{academies[selectedAcademyID].students.length}</h4>
          <label>Description:</label>

          {coaches[selectedCoachID].description.map((item, index) => {
            return (
              <div>
                <label> {index + 1}</label>
                <input
                  key={index}
                  onChange={(value) => handleDescriptionEdits(index, value)}
                  className="form-control"
                  placeholder="Description"
                  defaultValue={item}
                />
                <i onClick={editDescription} className="fas fa-pencil-alt"></i>
                <i
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteDescription(index)}
                  className="fas fa-trash"
                ></i>
              </div>
            );            
          })}

          <div style={{ marginTop: 10 }}>
            <input
              onChange={handleChange("description")}
              className="form-control"
              placeholder="Add a Description"
              value={description}
            />
            <i onClic={addDescription} className="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div className="tableContainer">{renderTable(selectedButton)}</div>
    </section>
  );
}

export default ShowCoachesDetails;
