import { useEffect, useState } from "react";
import { FaWindowMinimize } from "react-icons/fa";
import Navbar from "../../components/navbar/Navbar";
import firebaseConfig from "../../configs/firebaseConfig";
import { getAcademies, getSports, getCoaches } from "../../functions/getter";

export default function Sports(){
const [ sports, setSports ] = useState({});
const [name, setName] = useState('');
const [ selectedSportID, setSelectedSportID ] = useState('');
const [quote, setQuote] = useState('');
const [quoter, setQuoter] = useState('');
const allInputs = {imgUrl: ''}
const [imageAsFile, setImageAsFile] = useState('')
const [imageAsUrl, setImageAsUrl] = useState(allInputs);
const allInputs2 = {imgUrl2: ''}
const [imageAsFile2, setImageAsFile2] = useState('')
const [imageAsUrl2, setImageAsUrl2] = useState(allInputs2);

const toggleAddSportFlag = (e) => {
    document.getElementById("addBtn").style.display='none';
    document.getElementById("updateBtn").style.display='none';
    document.getElementById("sportDropdown").style.display='none';
    document.getElementById("sportBody").style.display='block';
    document.getElementById("updateButton").style.display='none';
    document.getElementById("saveButton").style.display='';
  }

  const toggleUpdateSportFlag = (e) => {
      document.getElementById("addBtn").style.display='none';
      document.getElementById("updateBtn").style.display='none';
      document.getElementById("sportDropdown").style.display='block';
      document.getElementById("sportBody").style.display='block';
      document.getElementById("updateButton").style.display='';
      document.getElementById("saveButton").style.display='none';
        }

      const updateSport = () => {
        if(selectedSportID==""){
          alert('Kindly select the sport to update from the dropdown provided.');
          return;
        }
        const sport = {
          name,
          academiesHeaderImage: imageAsUrl2 ? imageAsUrl2.imgUrl2 : null,
          academiesHeaderQuote: quote,
          academiesHeaderQuoter: quoter,
          url: imageAsUrl ? imageAsUrl.imgUrl : null,
          };

          firebaseConfig
          .firestore()
          .collection(`sports`)
          .doc(selectedSportID)
          .update(sport)
          .then(() => {
            alert('Sport '+sport.name+ ' updated successfully.');
            getSports().then((sport) => setSports(sport));
            setSelectedSportID("");
            window.location.reload();
          });
              }

  const handleChange = (e) => {
      console.log(sports);
      console.log(e.target.value);
      let sportID = e.target.value;
      if(sportID==''){
        setSelectedSportID("");
        setName("");
        setQuote("");
        setQuoter("");
        setImageAsUrl(prevObject => ({...prevObject, imgUrl: ""}))    
        setImageAsUrl2(prevObject => ({...prevObject, imgUrl2: ""}))      
      }
      else{
        setSelectedSportID(sportID);
        setName(sports[sportID].name);
        setQuote(sports[sportID].academiesHeaderQuote);
        setQuoter(sports[sportID].academiesHeaderQuoter);
        setImageAsUrl(prevObject => ({...prevObject, imgUrl: sports[sportID].url}))    
        setImageAsUrl2(prevObject => ({...prevObject, imgUrl2: sports[sportID].academiesHeaderImage}))    
        }
    }

const handleEdits = (item, key) => (e) => {
    const value = e.target.value;
    if(item=='name'){
      sports[key].name = value;
    }
    else if(item=='quote'){
      sports[key].academiesHeaderQuote = value;
    }
    else if(item=='quoter'){
        sports[key].academiesHeaderQuoter = value;
    }
    else{
        console.log("Not found");
    }
  }

  const handleOnChange = (item) => (e) => {
    if(item=='name'){
      setName(e.target.value);
    }
    else if(item=='quote'){
      setQuote(e.target.value);
    }
    else if(item=='quoter'){
      setQuoter(e.target.value);
    }
    else{
      console.log('Error');
    }
  };

  const createSport = () => {
    //    const coachRef = firebase.database().ref('coaches');
    if(name.length==0){
      alert('Kindly fill the required fields.');
      return;
    }

        const sport = {
          name,
          academiesHeaderImage: imageAsUrl2 ? imageAsUrl2.imgUrl2 : null,
          academiesHeaderQuote: quote,
          academiesHeaderQuoter: quoter,
          url: imageAsUrl ? imageAsUrl.imgUrl : null,
        };


    
        firebaseConfig
        .firestore()
        .collection(`sports`)
        .add(sport)
        .then((docRef) => {
            console.log(docRef.id);
            firebaseConfig.firestore().collection('sports').doc(docRef.id).update({
                uid: docRef.id
            }).then(() => {
                getSports().then((sport) => setSports(sport));
                alert('Sport added successfully.');
                toggleCancelFlag();
//                window.location.reload();      
            });
          })
      };
    
  
  
  const deleteSport = (key) => (e) => {
    console.log(key);
    firebaseConfig
    .firestore()
    .collection(`sports`)
    .doc(key)
    .delete()
    .then(() => {
      alert('Sport deleted successfully!');
    });
    getSports().then((sport) => setSports(sport));
    }

    const toggleCancelFlag = (e) => {
        document.getElementById("addBtn").style.display='block';
        document.getElementById("updateBtn").style.display='block';
        document.getElementById("sportDropdown").style.display='none';
        document.getElementById("sportBody").style.display='none';
        document.getElementById("updateButton").style.display='none';
        document.getElementById("saveButton").style.display='none';
            setImageAsFile("");
        setImageAsUrl("");
        setImageAsFile2("");
        setImageAsUrl2("");
        setName("");
        setQuote("");
        setQuoter("");
              }
      

    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
        setImageAsFile(imageFile => (image));
      }

      const handleImageAsFile2 = (e) => {
        const image = e.target.files[0];
        setImageAsFile2(imageFile => (image));
      }

      const handleFireBaseUpload = e => {
        e.preventDefault()
      console.log('start of upload');
      
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      
      const uploadTask = firebaseConfig.storage().ref(`/sportsImages/${imageAsFile.name}`).put(imageAsFile);
      
      uploadTask.on('state_changed', 
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            firebaseConfig.storage().ref('sportsImages').child(imageAsFile.name).getDownloadURL()
             .then(fireBaseUrl => {
               setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
             })
          });      
      }
      
      const handleFireBaseUpload2 = e => {
        e.preventDefault()
      console.log('start of upload');
      
      if(imageAsFile2 === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile2)}`)
      }
      
      const uploadTask = firebaseConfig.storage().ref(`/sports/${imageAsFile2.name}`).put(imageAsFile2);
      
      uploadTask.on('state_changed', 
          (snapShot) => {
            //takes a snap shot of the process as it is happening
            console.log(snapShot)
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            firebaseConfig.storage().ref('sports').child(imageAsFile2.name).getDownloadURL()
             .then(fireBaseUrl => {
               setImageAsUrl2(prevObject => ({...prevObject, imgUrl2: fireBaseUrl}))
             })
          });
      
      }

useEffect(() => {
    getSports().then((sport) => setSports(sport)); 
    toggleCancelFlag();
},[]);


    return(
        <>
        <Navbar/>
        <h2>Sports</h2>
        <div align="center">
{Object.keys(sports).length > 0 ? <table border="1">
  <thead>
  <tr>
    <th>Sport Name</th>
    <th>Header Quote</th>
    <th>Header Quoter</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
  {Object.keys(sports).map((key) => (
        <tr>
          <td><input disabled={true} onChange={handleEdits("name",key)} value={sports[key].name}/></td>
          <td><textarea cols={70} rows={2} disabled={true} onChange={handleEdits("quote")} value={sports[key].academiesHeaderQuote}></textarea></td>
          <td><input disabled={true} onChange={handleEdits("quoter")} value={sports[key].academiesHeaderQuoter}/></td>
          <td align="center"><button onClick={deleteSport(key)}>Delete</button></td>
          </tr>
    ))}
    </tbody>
</table> : <h3>No Sports found</h3>}
</div>

<div align="center">
    <table>
        <tbody>
            <tr>
                <td><button id="addBtn" onClick={toggleAddSportFlag}>Add Sport</button></td>
                <td><button id="updateBtn" onClick={toggleUpdateSportFlag}>Update Sport</button></td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
<div align="center">
    <table>
    <tr>
                <td>
                <select id="sportDropdown" onChange={handleChange}>
                <option value="">Choose the sport to update</option>
                {Object.keys(sports).map((sportId,index) => (
                  <option value={sportId} key={index}>
                    {sports[sportId].name}
                  </option>
                ))}
              </select>
                </td>
            </tr>

    </table>
</div>
<br/>
<br/>



<div id="sportBody" align="center">
<table>
    <tbody>
    <tr></tr>
    <tr>
      <td>Add/Update Sport</td>
    </tr>
<tr>
    <td>
    <label>Upload Sport Logo</label>
      <input type="file" onChange={handleImageAsFile}/>
      <button onClick={handleFireBaseUpload}>Upload</button>
    </td>
    <td align="center">
    <img width="100px" height="100px" src={imageAsUrl.imgUrl ? imageAsUrl.imgUrl : `data:image/jpeg;base64,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`} alt="image tag" />
    </td>
  </tr>
  <tr>
    <td>
    <label>Upload Header Image</label>
      <input type="file" onChange={handleImageAsFile2}/>
      <button onClick={handleFireBaseUpload2}>Upload</button>
    </td>
    <td align="center">
    <img width="100px" height="100px" src={imageAsUrl2.imgUrl2 ? imageAsUrl2.imgUrl2 : `data:image/jpeg;base64,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`} alt="image tag" />
    </td>
  </tr>
  <tr>
    <td>
    <label>Sport Name<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("name")} value={name} required />
    </td>
  </tr>
  <tr>
    <td>
    <label>Header Quote</label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("quote")} value={quote} />
    </td>
  </tr>
  <tr>
    <td>
    <label>Header Quoter</label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("quoter")} value={quoter} />
    </td>
  </tr>
  </tbody>
  </table>
  <button id="saveButton" onClick={createSport}>Save</button>
  <button id="updateButton" onClick={updateSport}>Update</button>
    <button onClick={toggleCancelFlag}>Cancel</button>
</div>

        </>
    );
}