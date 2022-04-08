import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { getAcademies, getSports } from "../../functions/getter";
import firebaseConfig from "../../configs/firebaseConfig";


export default function SportAcademyLinkage(){
    const [ academies, setAcademies ] = useState({});
    const [ sports, setSports ] = useState({});
    const [ selectedAcademyID, setSelectedAcademyID ] = useState("");
    const [ selectedSports, setSelectedSports ] = useState({});
    const [ remainingSports, setRemainingSports ] = useState({});
    const [ academySelectedFlag, setAcademySelectedFlag ] = useState("");

useEffect(() => {
    console.log("Use effect called");
        getAcademies().then((academy) => setAcademies(academy));
        getSports().then((sport) => setSports(sport));
        document.getElementById("academydropdown").value='Academies';
        document.getElementById("sportsData").style.display='none';
        document.getElementById("message").style.display='block';
        setSelectedAcademyID("");
},[academySelectedFlag]);

const deleteSport = (id) => (e) => {
    console.log(selectedSports[id].uid);
    let items = [];
    Object.keys(selectedSports).map(item => {
        if(selectedSports[item].uid !== selectedSports[id].uid){
            items.push(selectedSports[item].uid.trim());
        }
    });
    firebaseConfig.firestore().collection('academies').doc(selectedAcademyID).update({
        sports: items
    })
    .then(() => {
        setSelectedSports([...items]);
        setAcademySelectedFlag(!academySelectedFlag);
        alert(selectedSports[id].name+" deleted successfully.");
//        window.location.reload();
    });    
}

const addSport = (sid) => (e) => {
    let sport = e.target.value;
    console.log(sport);
    console.log(sid);
    let items = [];
    let sportIDs = [];
    Object.keys(selectedSports).map(item => {
            items.push(selectedSports[item]);
            sportIDs.push(selectedSports[item].uid.trim());
    });
        console.log("Length before adding"+items.length);
        console.log(sport);
        if(sportIDs.indexOf(sid.trim()) == -1){
            items.push(sport);
            sportIDs.push(sid.trim());
            console.log("Length after adding"+items.length);
            firebaseConfig.firestore().collection('academies').doc(selectedAcademyID).update({
                sports: sportIDs
            }).then((docRef) => {
                setSelectedSports([...items]);
                setAcademySelectedFlag(!academySelectedFlag);
                console.log(selectedSports);
                    alert(sports[sid].name+' added successfully.');
//                          setSelectedSports([...items]);
//                window.location.reload();
                });
        }
        else{
            alert('This sport is already present in the selected academy.');
        }
}

const setSportsByAcademy = (value) => {
    if(value!='Academies'){
        Object.keys(academies[value].sports).map((item) => {
          let sportID = academies[value].sports[item];  
          firebaseConfig.firestore().collection(`sports`).doc(sportID).get().then((item) => {
                setSelectedSports(prevarray => [...prevarray, item.data()]);
          });
        }); 
      }
}

const handleChange = async (event) => {
    let value = event.target.value;
    document.getElementById("sportsData").style.display='block';
    if(value=='Academies'){
        document.getElementById("message").style.display='block';
        setAcademySelectedFlag(!academySelectedFlag);
        setSelectedAcademyID("");
    }
    else{
        document.getElementById("message").style.display='none';
        setSelectedAcademyID(value);
    }
    console.log(value);
    setSelectedSports(prevArray => []);
    setSportsByAcademy(value);
  };


return (
    <>
    <Navbar/>
    <select id="academydropdown" onChange={handleChange}>
              <option value="Academies">Academies</option>
              {Object.keys(academies).map((academyId) => (
                <option value={academyId} key={academyId}>
                  {academies[academyId].name}
                </option>
              ))}
            </select>

<div align="center">
<table width={1000}>
    <tbody>
        <tr align="center">
            <td>Available Sports</td>
            <td>Selected Sports</td>
        </tr>
        <tr align="center">
            <td>
            {Object.keys(sports).map(id => {
    return <div><button value={sports[id]} onClick={addSport(id)}>{sports[id].name}</button><br/></div>
})}
            </td>
            <td>
            <div id="sportsData">
                {selectedAcademyID && selectedSports ?
                <div>
                {Object.keys(selectedSports).map(id => {
        return <div>
            <input value={selectedSports[id].name}/> <i value={selectedSports[id].uid} onClick={deleteSport(id)} className="fas fa-trash-alt"></i>
            </div>
    })}           </div> : 'Here Select an academy to show sports data.'
                 }
                 </div>

                 <div id="message">'Select an academy to show sports data.'</div>
                  </td>
        </tr>
    </tbody>
</table>
</div>
<hr/>
<hr/>
    </>
);

}