import "./AcademyPrices.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { getAcademies, getSports } from "../../functions/getter";
import DisplayAcademyPricing1 from "../../components/datatable/DisplayAcademyPricing1";
import firebaseConfig from "../../configs/firebaseConfig";

export default function AcademyPrices() {
  const [academies, setAcademies] = useState({});
  const [selectedAcademyID, setSelectedAcademyID] = useState("");
  const [selectedSportID, setSelectedSportID] = useState("");
  const [selectedButton, setselectedButton] = useState("");
  const [ selectedSports, setSelectedSports] = useState([]);
  const [ selectSportPackage, setSelectSportPackage ] = useState([]);
  const [ isPackagePresent, setIsPackagePresent ] = useState();
  const [ selectedPackageID, setSelectedPackageID ] = useState("");

  const handleChange = async (event) => {
    document.getElementById("academydropdown").disabled="true";
    const datax = await setSelectedAcademyID(event.target.value);
    setSelectedSports(prevArray => []);
    if(event.target.value!='Academies'){
      Object.keys(academies[event.target.value].sports).map((item) => {
        let sportID = academies[event.target.value].sports[item];  
        firebaseConfig.firestore().collection(`sports`).doc(sportID).get().then((item) => {
              setSelectedSports(prevarray => [...prevarray, item.data()]);
        });
      });  
    }
  };

  const refresh = () => {
    window.location.reload();
//    setSelectedSportID("Sports");
 //   document.getElementById("sportsdropdown").value="Sports";
  //  document.getElementById("academydropdown").value="Academies";
    //document.getElementById("sportsdropdown").disabled=false;
    //document.getElementById("academydropdown").disabled=false;
  }

  const getPaymentDetails = () => {
    console.log("My Sports ID -"+selectedSportID);
    console.log("My ACademy ID -"+selectedAcademyID);
      let academyRef = firebaseConfig.firestore().collection(`academies`).doc(selectedAcademyID);
      firebaseConfig.firestore().collection(`packages`)
      .where('sports','==',selectedSportID)
      .where('academy','==',academyRef)
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs.length);
        if(snapshot.docs.length==0){
          setSelectedPackageID('');
          setSelectSportPackage([]);
          setIsPackagePresent(false);
        }
        else{
          for (const item of snapshot.docs) {
            setSelectedPackageID(item.id);
            setSelectSportPackage(prevarray => [...prevarray, item.data()]);
            setIsPackagePresent(true);
          }
        }
    });

  }

  const handleChange2 = (event) => {
    console.log("My ACademy ID is - "+selectedAcademyID);
    document.getElementById("sportsdropdown").disabled="true";
    setSelectedSportID(event.target.value);
    //getPaymentDetails();
    };

  const renderTable = (selectedSport) => {
    switch (selectedSport) {
      case "Sports":
        return <div>Select Academy and Sports to show data</div>;
      default:
        return (
          <DisplayAcademyPricing1
            payments={selectSportPackage}
            selectedAcademyID={selectedAcademyID}
            selectedSportID={selectedSport}
            isPackagePresent={isPackagePresent}
            selectedPackageID={selectedPackageID}
          />
        );
    }
  };

  useEffect(() => {
    getAcademies().then((academy) => setAcademies(academy));
    setSelectedPackageID("new");
  }, []);

  return (
    <>
      <Navbar />
      <section>
<div align="center">
<table>
  <tbody>
  <tr>
    <td>
    <div>
          <form className="form">
            <label>Academy:</label>
            <select id="academydropdown" onChange={handleChange}>
              <option value="Academies">Academies</option>
              {Object.keys(academies).map((academyId) => (
                <option value={academyId} key={academyId}>
                  {academies[academyId].name}
                </option>
              ))}
            </select>
          </form>
        </div>
      </td>
<td>
{selectedAcademyID ? <div>
          <form className="form">
            <label>Sports:</label>
            <select id="sportsdropdown" onChange={handleChange2}>
              <option value="Sports">Sports</option>
              {Object.keys(selectedSports).map((sport) => (
                <option value={selectedSports[sport].name} key={sport}>
                  {selectedSports[sport].name}
                </option>
              ))}
            </select>
          </form>
        </div>:null}
</td>
<td>
{selectedAcademyID ? <button onClick={refresh}>Reset</button>:null}
</td>
  </tr>
  </tbody>
</table>
<div align="center">
<table>
  <tbody>
  <tr>
    <td>{selectedSportID ? <button onClick={getPaymentDetails}>Fetch Packages</button>:null}
</td>
  </tr>
  </tbody>
</table>
</div>
</div>



        {selectedSportID && selectedAcademyID && (isPackagePresent || selectedPackageID=='') ?  
        <div className="center">
          {renderTable(selectedSportID)}
          </div>:null}
      </section>
    </>
  );
}
