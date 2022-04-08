import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import firebaseConfig from "../../configs/firebaseConfig";
import firebase from 'firebase';
import { getAcademies, getSports, getCoaches, getUsers, getBatches } from "../../functions/getter";

export default function Sports(){
    const [ batches, setBatches ] = useState("");
    const [id, setId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [days, setDays] = useState('');
    const [facility, setFacility] = useState('');
    const [level, setLevel] = useState('');
    const [timings, setTimings] = useState('');
    const [ academies, setAcademies ] = useState({});
    const [ sports, setSports ] = useState({});
    const [ sport, setSport ] = useState('');
    const [ selectedAcademyID, setSelectedAcademyID ] = useState("");
    const [ selectedBatchID, setSelectedBatchID ] = useState("");
    
    useEffect(() => {
        getAcademies().then(academy => setAcademies(academy));
        getSports().then(sport => setSports(sport));
//        toggleCancelFlag();
    },[]);

    const toggleAddBatchFlag = (e) => {
        document.getElementById("addBtn").style.display='none';
        document.getElementById("updateBtn").style.display='none';
        document.getElementById("batchDropdown").style.display='none';
        document.getElementById("batchBody").style.display='block';
        document.getElementById("updateButton").style.display='none';
        document.getElementById("saveButton").style.display='';
          }
    
      const toggleUpdateBatchFlag = (e) => {
          document.getElementById("addBtn").style.display='none';
          document.getElementById("updateBtn").style.display='none';
          document.getElementById("batchDropdown").style.display='block';
          document.getElementById("batchBody").style.display='block';
          document.getElementById("updateButton").style.display='';
          document.getElementById("saveButton").style.display='none';
                }
 
          const handleChange = (e) => {
            let batchId = e.target.value;
            setSelectedBatchID(batchId);
            setId(batches[batchId].id);
            setLevel(batches[batchId].level);
            setFacility(batches[batchId].facility);
            setDays(batches[batchId].days);
            setTimings(batches[batchId].timings.startTime+'-'+batches[batchId].timings.endTime);
            setCapacity(batches[batchId].capacity);
            setSport(batches[batchId].sport);
        }

        const handleChange1 = async (e) => {
            let academyId = e.target.value;
            console.log(academyId);
            await setSelectedAcademyID(academyId);
            getBatches(academyId.trim()).then((batch) => setBatches(batch));
            toggleCancelFlag();
        }

        const handleOnChange = (item) => (e) => {
            if(item=='id'){
              setId(e.target.value.toUpperCase());
            }
            else if(item=='days'){
              setDays(e.target.value);
            }
            else if(item=='level'){
                setLevel(e.target.value);
              }
              else if(item=='timings'){
              setTimings(e.target.value);
            }
            else if(item=='facility'){
                setFacility(e.target.value);
              }
              else if(item=='capacity'){
                setCapacity(e.target.value);
              }
              else if(item=='sport'){
                setSport(e.target.value);
              }
                  else{
              console.log('Error');
            }
          };

          const createBatch = () => {
            if(id=='' || capacity=='' || facility=='' || days=='' || timings=='' || level=='' || sport==''){
              alert('Kindly fill the required fields. (marked with (*)asterisk mark)');
              return;    
            }
                const batch = {
                  id,
                  capacity: parseInt(capacity),
                  facility,
                  days: days.split(','),
                  timings: {startTime: timings.split('-')[0], endTime: timings.split('-')[1]},
                  coach: "",
                  level,
                  nextClass: null,
                  onGoingClass: null,
                  status: 'done',
                  students: [],
                  sport
                };
        
        
            
                firebaseConfig
                .firestore()
                .collection(`academies/`+selectedAcademyID+'/batches')
                .add(batch)
                .then(() => {
                    getBatches(selectedAcademyID).then((batch) => setBatches(batch));
                        alert('Batch added successfully.');
                        toggleCancelFlag();
                    });
              };

              const updateBatch = () => {
                console.log(timings);
//                return;
                if(selectedBatchID==''){
                  alert('Kindly select the batch to update from the dropdown provided.');
                  return;        
                }

                if(id=='' || capacity=='' || facility=='' || days=='' || timings=='' || level=='' || sport==''){
                  alert('Kindly fill the required fields. (marked with (*)asterisk mark)');
                  return;    
                }
                    const batch = {
                      id,
                      capacity: parseInt(capacity),
                      facility,
                      days: days.toString().split(','),
                      timings: {startTime: timings.split('-')[0], endTime: timings.split('-')[1]},
                      coach: "",
                      level,
                      nextClass: null,
                      onGoingClass: null,
                      status: 'done',
                      students: [],
                      sport
                    };
            
            
                
                    firebaseConfig
                    .firestore()
                    .collection(`academies/`+selectedAcademyID+'/batches')
                    .doc(selectedBatchID)
                    .update(batch)
                    .then(() => {
                        getBatches(selectedAcademyID).then((batch) => setBatches(batch));
                            alert('Batch updated successfully.');
                            toggleCancelFlag();
                        });
                  };
    

    const deleteBatch = (key) => (e) => {
        console.log(key);
        firebaseConfig
        .firestore()
        .collection(`academies/`+selectedAcademyID+'/batches')
        .doc(key)
        .delete()
        .then(() => {
          alert('Batch deleted successfully!');
        });
        getBatches(selectedAcademyID).then((batch) => setBatches(batch));
        }
    

        const toggleCancelFlag = (e) => {
            document.getElementById("addBtn").style.display='block';
            document.getElementById("updateBtn").style.display='block';
            document.getElementById("batchDropdown").style.display='none';
            document.getElementById("batchBody").style.display='none';
            document.getElementById("updateButton").style.display='none';
            document.getElementById("saveButton").style.display='none';
              setId("");
            setLevel("");
            setFacility("");
            setCapacity("");
            setDays("");
            setTimings("");
                  }
    
    const handleEdits = (item, key) => (e) => {
        const value = e.target.value;
        if(item=='id'){
          batches[key].id = value;
        }
        else if(item=='days'){
            batches[key].days = value;
        }
        else if(item=='sport'){
            batches[key].sport = value;
        }
        else if(item=='level'){
            batches[key].level = value;
        }
        else if(item=='facility'){
            batches[key].facility = value;
        }
        else if(item=='capacity'){
            batches[key].capacity = value;
        }
        else if(item=='timings'){
            batches[key].timings = value;
        }
        else{
            console.log("Not found");
        }
      }
    

    return(
        <>
        <Navbar/>
        <div align="center">
        <table align="center" border="1">
            <tbody>
                <tr align="center">
                    <td>
                    <select id="academyDropdown" onChange={handleChange1}>
                <option value="">Choose the academy to update</option>
                {Object.keys(academies).map((academyId) => (
                  <option value={academies[academyId].id} key={academyId}>
                    {academies[academyId].name}
                  </option>
                ))}
              </select>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        {selectedAcademyID ? <div>
        <h2>Batches (Total - {Object.keys(batches).length})</h2>
        <div align="center">
{Object.keys(batches).length > 0 ? <table border="1">
  <thead>
  <tr>
    <th>Batch ID</th>
    <th>Days</th>
    <th>Timing</th>
    <th>Level</th>
    <th>Facility</th>
    <th>Capacity</th>
    <th>Sport</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
  {Object.keys(batches).map((key) => (
        <tr>
          <td><input disabled={true} onChange={handleEdits("id",key)} value={batches[key].id}/></td>
          <td><input disabled={true} onChange={handleEdits("days")} value={batches[key].days}/></td>
          <td><input disabled={true} onChange={handleEdits("timings")} value={batches[key].timings.startTime + ':' + batches[key].timings.endTime}/></td>
          <td><input disabled={true} onChange={handleEdits("level")} value={batches[key].level}/></td>
          <td><input disabled={true} onChange={handleEdits("facility")} value={batches[key].facility}/></td>
          <td><input disabled={true} onChange={handleEdits("capacity")} value={batches[key].capacity}/></td>
          <td><input disabled={true} onChange={handleEdits("sport")} value={batches[key].sport}/></td>
          <td align="center"><button onClick={deleteBatch(key)}>Delete</button></td>
          </tr>
    ))}
    </tbody>
</table> : <h3>No Batches found</h3>}
</div>

<div align="center">
    <table>
        <tbody>
            <tr>
                <td><button id="addBtn" onClick={toggleAddBatchFlag}>Add Batch</button></td>
                <td><button id="updateBtn" onClick={toggleUpdateBatchFlag}>Update Batch</button></td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
<div align="center">
    <table>
        <tbody>
    <tr>
                <td>
                <select id="batchDropdown" onChange={handleChange}>
                <option value="">Choose the batch to update</option>
                {Object.keys(batches).map((batchId,index) => (
                  <option value={batchId} key={index}>
                    {batches[batchId].id}
                  </option>
                ))}
              </select>
                </td>
            </tr>
            </tbody>
    </table>
</div>
<br/>
<br/>



<div id="batchBody" align="center">
<table>
    <tbody>
    <tr></tr>
    <tr>
      <td>Add/Update Batch</td>
    </tr>
  <tr>
    <td>
    <label>Batch ID<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("id")} value={id} />
    </td>
  </tr>
  <tr>
    <td>
    <label>Days<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <select onChange={handleOnChange("days")} value={days}>
                <option value="">Select the day</option>
                <option value="Mon,Wed,Fri">MWF (Mon, Wed, Fri)</option>
                <option value="Mon,Wed,Fri, Sat">MWFS (Mon, Wed, Fri, Sat)</option>
                <option value="Tue,Thurs,Sat">TTS (Tue, Thurs, Sat)</option>
                <option value="Sat,Sun">SS (Sat, Sun)</option>
                <option value="Mon,Tue,Wed,Thurs,Fri,Sat">All Days (Except Sunday)</option>
              </select>
    </td>
  </tr>
  <tr>
    <td>
    <label>Timings<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
      <select onChange={handleOnChange("timings")} value={timings}>
        <option value="Select the timings">Select the timings</option>
        <option value="0700-0755">07:00-07:55 AM</option>
        <option value="0800-0855">08:00-08:55 AM</option>
        <option value="0900-0955">09:00-09:55 AM</option>
        <option value="1000-1055">10:00-10:55 AM</option>
        <option value="1100-1155">11:00-11:55 AM</option>
        <option value="1600-1655">04:00-04:55 PM</option>
        <option value="1700-1755">05:00-05:55 PM</option>
        <option value="1800-1855">06:00-06:55 PM</option>
        <option value="1900-1955">07:00-07:55 PM</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>
    <label>Level<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
      <select onChange={handleOnChange("level")} value={level} >
        <option value="">Select the level of student</option>
        <option value='Beginner'>Beginner</option>
        <option value='Intermediate'>Intermediate</option>
        <option value='Advanced'>Advanced</option>
        <option value='Professional'>Professional</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>
    <label>Facility<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <select onChange={handleOnChange("facility")} value={facility} >
        <option value="">Select the facility</option>
        <option value='Court 1'>Court 1</option>
        <option value='Court 2'>Court 2</option>
        <option value='Court 3'>Court 3</option>
        <option value='Court 4'>Court 4</option>
        <option value='Court 4'>Court 5</option>
        <option value='Court 4'>Court 6</option>
      </select>
    </td>
  </tr>
  <tr>
    <td>
    <label>Capacity<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <input type="number" onChange={handleOnChange("capacity")} value={capacity} />
    </td>
  </tr>
  <tr>
    <td>
    <label>Sport<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <select onChange={handleOnChange("sport")} value={sport}>
                <option value="">Select the sport</option>
                {Object.keys(sports).map((sportId,index) => (
                  <option value={sports[sportId].name} key={index}>
                    {sports[sportId].name}
                  </option>
                ))}
              </select>
    </td>
  </tr>
  </tbody>
  </table>
  <button id="saveButton" onClick={createBatch}>Save</button>
  <button id="updateButton" onClick={updateBatch}>Update</button>
    <button onClick={toggleCancelFlag}>Cancel</button>
</div>
</div>: null}
        </>
    );
}