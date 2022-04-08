import React, { useState, useEffect } from "react";
import firebaseConfig from "../../configs/firebaseConfig";
import DisplayCoaches from "../datatable/DisplayCoaches";
import DisplayStudents from "../datatable/DisplayStudents";
import DisplayBatches from "../datatable/DisplayBatches";
import { getStudents, getCoaches, getBatches } from "../../functions/getter";

function ShowAcademyDetails({ selectedAcademyID, academies }) {
  const [students, setStudents] = useState({});
  const [batches, setBatches] = useState({});
  const [coaches, setcoaches] = useState({});
  const [selectedButton, setselectedButton] = useState("");
  const [facilityEdits, setfacilityEdits] = useState(
    academies[selectedAcademyID].facilities
  );
  const [ruleEdits, setruleEdits] = useState(
    academies[selectedAcademyID].rules
  );

  const [safetyEdits, setsafetyEdits] = useState(
    academies[selectedAcademyID].safety
  );

  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
    safety: "",
    address: "",
    facility: "",
    rule: "",
    published: "",
  });

  const {
    name,
    description,
    location,
    published,
    safety,
    facility,
    rule,
    address,
  } = values;

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleFacilityEdits = (index, data) => {
    setfacilityEdits((old) => {
      old[index] = data.target.value;
      return old;
    });
  };

  const handleRuleEdits = (index, data) => {
    setruleEdits((old) => {
      old[index] = data.target.value;
      return old;
    });
  };

  const handleSafetyEdits = (index, data) => {
    setsafetyEdits((old) => {
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

  const editFacility = () => {
    firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        facilities: facilityEdits,
      })
      .then(() => {
        console.log("Facility edited");
      });
  };

  const editRule = async () => {
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        rules: ruleEdits,
      });
  };
  const editSafety = async () => {
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        safety: safetyEdits,
      });
  };

  const addFacility = async () => {
    const facilities = academies[selectedAcademyID].facilities;
    facilities.push(facility);
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        facilities: facilities,
      });

    await setValues({
      ...values,
      facility: "",
    });
  };

  const addRule = async () => {
    console.log("entered");
    const rules = academies[selectedAcademyID].rules;
    console.log(rules);
    rules.push(rule);
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        rules: rules,
      });

    await setValues({
      ...values,
      rule: "",
    });
    console.log('Rule added');
  };

  const addSafety = async () => {
    const safeties = academies[selectedAcademyID].safety;
    safeties.push(safety);
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        safety: safeties,
      });

    await setValues({
      ...values,
      safety: "",
    });
    console.log("safety added");
  };

  const deleteFacility = async (facilityIndex) => {
    const facilityArr = academies[selectedAcademyID].facilities;
    // const index = facilityArr.indexOf(facility);
    if (facilityIndex > -1) {
      facilityArr.splice(facilityIndex, 1);
    }
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        facilities: facilityArr,
      });

    await setValues({
      ...values,
      facility: "",
    });
  };
  const deleteRule = async (ruleIndex) => {
    const rulesArr = academies[selectedAcademyID].rules;

    if (ruleIndex > -1) {
      rulesArr.splice(ruleIndex, 1);
    }
    console.log(rulesArr);
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        rules: rulesArr,
      });
    await setValues({
      ...values,
      rule: "",
    });
  };

  const deleteSafety = async (safetyIndex) => {
    const safetyArr = academies[selectedAcademyID].safety;
    if (safetyIndex > -1) {
      safetyArr.splice(safetyIndex, 1);
    }
    await firebaseConfig
      .firestore()
      .collection(`academies`)
      .doc(selectedAcademyID)
      .update({
        safety: safetyArr,
      });
    await setValues({
      ...values,
      safety: "",
    });
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
    console.log('Entered');
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
      <div className="academyDetails">
        <div className="left">
          <img
            src={academies[selectedAcademyID].profileImage}
            alt="Avatar"
            width="100"
            height="100"
          />
          <h4>
            Reviews : {academies[selectedAcademyID].rating}
            <span className="ratingIcon">
              <i className="fa fa-star" aria-hidden="true"></i>
            </span>
          </h4>
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
          <div className="form-group">
            Addrs:
            <input
              onChange={handleChange("address")}
              className="form-control"
              placeholder="Address"
              value={address}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div>

          {/* <div className="form-group">
            Locat:
            <input
              onChange={handleChange("location")}
              className="form-control"
              placeholder="Location"
              value={location}
            />
            <i onClick={onSubmit} className="fas fa-pencil-alt"></i>
          </div> */}
        </div>
        <div className="right">
          <button onClick={changePublished} className="publish-btn">
            {academies[selectedAcademyID].published
              ? "Published"
              : "Unpublished"}
          </button>
          <h4>Coaches:{academies[selectedAcademyID].coaches.length}</h4>
          <h4>Students:{academies[selectedAcademyID].students.length}</h4>
          <label>Facilities:</label>

          {academies[selectedAcademyID].facilities.map((item, index) => {
            return (
              <div>
                <label> {index + 1}</label>
                <input
                  key={index}
                  onChange={(value) => handleFacilityEdits(index, value)}
                  className="form-control"
                  placeholder="Facility"
                  defaultValue={item}
                />
                <i onClick={editFacility} className="fas fa-pencil-alt"></i>
                <i
                  style={{ marginLeft: 5 }}
                  onClick={() => deleteFacility(index)}
                  className="fas fa-trash"
                ></i>
              </div>
            );            
          })}

          <div style={{ marginTop: 10 }}>
            <input
              onChange={handleChange("facility")}
              className="form-control"
              placeholder="Add a Facility"
              value={facility}
            />
            <i onClic={addFacility} className="fas fa-plus"></i>
          </div>

          <label>Rules:</label>

          {academies[selectedAcademyID].rules.map((item, index) => (
            <div>
              <label> {index + 1}</label>

              <input
                key={index}
                onChange={(value) => handleRuleEdits(index, value)}
                className="form-control"
                placeholder="Add Rules"
                defaultValue={item}
              />
              <i onClick={editRule} className="fas fa-pencil-alt"></i>
              <i
                style={{ marginLeft: 5 }}
                onClick={() => deleteRule(index)}
                className="fas fa-trash"
              ></i>
            </div>
          ))}

          <div style={{ marginTop: 10 }}>
            <input
              onChange={handleChange("rule")}
              className="form-control"
              placeholder="Add Rules"
              defaultValue={rule}
            />
            <i onClick={addRule} className="fas fa-plus"></i>
          </div>

          <label>Safeties:</label>

          {academies[selectedAcademyID].safety.map((item, index) => (
            <div>
              <label> {index + 1}</label>

              <input
                key={index}
                onChange={(value) => handleSafetyEdits(index, value)}
                className="form-control"
                placeholder="Add Safety"
                defaultValue={item}
              />
              <i onClick={editSafety} className="fas fa-pencil-alt"></i>
              <i
                style={{ marginLeft: 5 }}
                onClick={() => deleteSafety(index)}
                className="fas fa-trash"
              ></i>
            </div>
          ))}

          <div style={{ marginTop: 10 }}>
            <input
              onChange={handleChange("safety")}
              className="form-control"
              placeholder="Add Safety"
              defaultValue={safety}
            />
            <i onClick={addSafety} className="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={() => onButtonSelect("students")} className="btn">
          Students
        </button>
        <button onClick={() => onButtonSelect("coaches")} className="btn">
          Coaches
        </button>
        <button onClick={() => onButtonSelect("batches")} className="btn">
          Batches
        </button>
      </div>

      <div className="tableContainer">{renderTable(selectedButton)}</div>
    </section>
  );
}

export default ShowAcademyDetails;
