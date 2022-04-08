import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import firebaseConfig from "../../configs/firebaseConfig";
import firebase from 'firebase';
import { getAcademies, getSports, getCoaches, getUsers, getCoupons, getStudents } from "../../functions/getter";
import { AuthContext } from "../../auth/Auth";

export default function Trials(){
    const [ selectedAcademyID, setSelectedAcademyID ] = useState("");
    const [ selectedStudents, setSelectedStudents ] = useState({});
    const [ academies, setAcademies ] = useState({});
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  //    const [ playerName, setPlayerName ] = useState("");
//    const [ nextClass, setNextClass ] = useState("");


useEffect(() => {
    getAcademies().then(academy => setAcademies(academy));    
}, []);

const handleChange = async (e) => {
    let academyId = e.target.value;
    await setSelectedAcademyID(academyId);
    await getStudents(academyId).then(student => setSelectedStudents(student));
}


const handleChange2 = (event) => {
    console.log("My ACademy ID is - "+selectedAcademyID);
    console.log(selectedStudents);
//    document.getElementById("sportsdropdown").disabled="true";
//    setSelectedSportID(event.target.value);
    //getPaymentDetails();
    };

    const handleEdits = (item, key) => (e) => {
        const value = e.target.value;
        if(item=='nextClass'){
            selectedStudents[key].nextClass = value;
        }
        else if(item=='playerName'){
            selectedStudents[key].playerName = value;
        }
        else{
            console.log("Not found");
        }
      }

      const approveTrial = (key) => (e) => {
        if(window.confirm('Are you sure you want to approve this trial?')){
            firebaseConfig.firestore().collection(`academies/${selectedAcademyID}/students`).doc(key)
            .update({
                status: 'Approved'
            })
            .then(() => {
                getStudents(selectedAcademyID).then(student => setSelectedStudents(student))
                .then(() => {
                    alert('Approved Successfully.');
                });
            })    
        }
      }

      const rejectTrial = (key) => () => {
          if(window.confirm('Are you sure you want to reject this trial?')){
            firebaseConfig.firestore().collection(`academies/${selectedAcademyID}/students`).doc(key)
          .update({
              status: 'Rejected'
          })
          .then(() => {
                getStudents(selectedAcademyID).then(student => setSelectedStudents(student))
                .then(() => {
                    alert('Rejected Successfully.');
                });
          })
        }
      }

      const refresh = () => {
        window.location.reload();
      }

      
    return(
        <>
        <Navbar/>

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
{false ? <div>
          <form className="form">
            <label>Sports:</label>
            <select id="studentsdropdown" onChange={handleChange2}>
              <option value="Students">Students</option>
              {Object.keys(selectedStudents).map((student) => (
                <option value={selectedStudents[student].name} key={student}>
                  {selectedStudents[student].name}
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
</div>

        <h2>Trials Data (Total - {Object.keys(selectedStudents).length})</h2>
        <div align="center">
{Object.keys(selectedStudents).length > 0 ? <table border="1">
  <thead>
  <tr>
    <th>Student Name</th>
    <th>Class Date</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
  {Object.keys(selectedStudents).map((key) => (
        <tr>
          <td align="center"><input disabled={true} onChange={handleEdits("playerName",key)} value={selectedStudents[key].playerName}/></td>
          <td align="center" width={'40%'}><textarea disabled={true} onChange={handleEdits("nextClass")} value={selectedStudents[key].nextClass.toDate().getDate()+' '+months[selectedStudents[key].nextClass.toDate().getMonth()]+' '+selectedStudents[key].nextClass.toDate().getFullYear()+ ' '+ selectedStudents[key].nextClassTime}></textarea></td>
          <td align="center" width={'30%'}>
              {selectedStudents[key].status=='On Trial' ? 
              (<div>
              <button style={{marginRight:'5%'}} onClick={approveTrial(key)}>Approve</button>
              <button style={{marginRight:'5%'}} onClick={rejectTrial(key)}>Reject</button>
              </div>
              )
              : (selectedStudents[key].status=='Approved' ? <h6 style={{color:'green'}}>Approved</h6> : <h6 style={{color:'red'}}>Rejected</h6>)
              }
              </td>
          </tr>
    ))}
    </tbody>
</table> : (selectedAcademyID ? <h3>No Trial Data found</h3>: <h3>Kindly select the academy to show trial data</h3> )}
</div>

        </>
    );
}