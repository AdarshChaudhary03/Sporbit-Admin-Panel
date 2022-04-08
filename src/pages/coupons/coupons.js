import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import firebaseConfig from "../../configs/firebaseConfig";
import firebase from 'firebase';
import { getAcademies, getSports, getCoaches, getUsers, getCoupons } from "../../functions/getter";
import { AuthContext } from "../../auth/Auth";

export default function Coupons(){
const [ coupons, setCoupons ] = useState("");
const [couponCode, setCouponCode] = useState('');
const [percentOff , setPercentOff] = useState('');
const [message , setMessage] = useState('');
const [ selectedCouponID, setSelectedCouponID] = useState('');

const { currentUser } = useContext(AuthContext);

useEffect(() => {
    getCoupons().then((coupon) => setCoupons(coupon));
    toggleCancelFlag();
},[]);

const handleEdits = (item, key) => (e) => {
    const value = e.target.value;
    if(item=='couponCode'){
      coupons[key].couponCode = value;
    }
    else if(item=='percentOff'){
        coupons[key].percentOff = value;
    }
    else if(item=='message'){
        coupons[key].message = value;
    }
    else{
        console.log("Not found");
    }
  }

  const toggleAddCouponFlag = (e) => {
    document.getElementById("addBtn").style.display='none';
    document.getElementById("updateBtn").style.display='none';
    document.getElementById("couponDropdown").style.display='none';
    document.getElementById("couponBody").style.display='block';
    document.getElementById("updateButton").style.display='none';
    document.getElementById("saveButton").style.display='';
  }

  const toggleCancelFlag = (e) => {
    document.getElementById("addBtn").style.display='block';
    document.getElementById("updateBtn").style.display='block';
    document.getElementById("couponDropdown").style.display='none';
    document.getElementById("couponBody").style.display='none';
    document.getElementById("saveButton").style.display='none';
    document.getElementById("updateButton").style.display='none';
    setCouponCode("");
    setPercentOff("");
    setMessage("");
          }


  const toggleUpdateCouponFlag = (e) => {
      document.getElementById("addBtn").style.display='none';
      document.getElementById("updateBtn").style.display='none';
      document.getElementById("couponDropdown").style.display='block';
      document.getElementById("couponBody").style.display='block';
      document.getElementById("saveButton").style.display='none';
      document.getElementById("updateButton").style.display='';
    }

      const handleChange = (e) => {
        let couponId = e.target.value;
        if(couponId==''){
          setSelectedCouponID("");
          setCouponCode("");
          setPercentOff("");
          setMessage("");
        }
        else{
          setSelectedCouponID(couponId);
          setCouponCode(coupons[couponId].couponCode);
          setPercentOff(coupons[couponId].percentOff);
          setMessage(coupons[couponId].message);
          }
    }


  const deleteCoupon = (key) => (e) => {
    console.log(key);
    firebaseConfig
    .firestore()
    .collection(`coupons`)
    .doc(key)
    .delete()
    .then(() => {
      alert('Coupon deleted successfully!');
      setSelectedCouponID("");
    });
    getCoupons().then((coupon) => setCoupons(coupon));
    }

    const handleOnChange = (item) => (e) => {
        if(item=='couponCode'){
          setCouponCode(e.target.value.toUpperCase());
        }
        else if(item=='percentOff'){
          setPercentOff(e.target.value);
        }
        else if(item=='message'){
          setMessage(e.target.value);
        }
            else{
          console.log('Error');
        }
      };

      const updateCoupon = () => {

        if(selectedCouponID==''){
          alert('Kindly select the coupon to update from the dropdown provided.');
          return;
            }

        if(couponCode=='' || percentOff==''){
          alert('Kindly fill the required fields. (marked with (*)asterisk mark)');
          return;
        }

        const coupon = {
            couponCode,
            percentOff: parseInt(percentOff),
            message
          };

          firebaseConfig
          .firestore()
          .collection(`coupons`)
          .doc(selectedCouponID)
          .update(coupon)
          .then(() => {
            alert('Coupon '+coupon.couponCode+ ' updated successfully.');
            getCoupons().then((coupon) => setCoupons(coupon));
            setSelectedCouponID("");
          });
              }

      const createCoupon = () => {
        //    const coachRef = firebase.database().ref('coaches');
        if(couponCode=='' || percentOff==''){
          alert('Kindly fill the required fields. (marked with (*)asterisk mark)');
          return;
        }

            const coupon = {
              couponCode,
              percentOff: parseInt(percentOff),
              message,
              createdAt: new Date(),
              createdBy: currentUser.displayName
            };

            firebaseConfig
            .firestore()
            .collection(`coupons`)
            .add(coupon)
            .then((docRef) => {
                console.log(docRef.id);
                firebaseConfig.firestore().collection('coupons').doc(docRef.id).update({
                    uid: docRef.id
                }).then(() => {
                    getCoupons().then((coupon) => setCoupons(coupon));
                    alert('Coupon added successfully.');
                    toggleCancelFlag();
                });
              })
          };


    return(
        <>
        <Navbar/>
        <h2>Coupons (Total - {Object.keys(coupons).length})</h2>
        <div align="center">
{Object.keys(coupons).length > 0 ? <table border="1">
  <thead>
  <tr>
    <th>Coupon Code</th>
    <th>Discount</th>
    <th>Message</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
  {Object.keys(coupons).map((key) => (
        <tr>
          <td><input disabled={true} onChange={handleEdits("couponCode",key)} value={coupons[key].couponCode}/></td>
          <td><input disabled={true} onChange={handleEdits("percentOff")} value={coupons[key].percentOff+'%'}/></td>
          <td><input disabled={true} onChange={handleEdits("message")} value={coupons[key].message}/></td>
          <td align="center"><button onClick={deleteCoupon(key)}>Delete</button></td>
          </tr>
    ))}
    </tbody>
</table> : <h3>No Coupons found</h3>}
</div>

<div align="center">
    <table>
        <tbody>
            <tr>
                <td><button id="addBtn" onClick={toggleAddCouponFlag}>Add Coupon</button></td>
                <td><button id="updateBtn" onClick={toggleUpdateCouponFlag}>Update Coupon</button></td>
            </tr>
            <tr></tr>
        </tbody>
    </table>
</div>
<div align="center">
    <table>
    <tr>
                <td>
                <select id="couponDropdown" onChange={handleChange}>
                <option value="">Choose the coupon to update</option>
                {Object.keys(coupons).map((couponId,index) => (
                  <option value={couponId} key={index}>
                    {coupons[couponId].couponCode}
                  </option>
                ))}
              </select>
                </td>
            </tr>

    </table>
</div>
<br/>
<br/>



<div id="couponBody" align="center">
<table>
    <tbody>
    <tr></tr>
    <tr>
      <td>Add/Update Coupon</td>
    </tr>
  <tr>
    <td>
    <label>Coupon Code<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("couponCode")} value={couponCode} />
    </td>
  </tr>
  <tr>
    <td>
    <label>Discount<span style={{color:'red'}}>*</span></label>
    </td>
    <td>
    <input type="number" onChange={handleOnChange("percentOff")} value={percentOff} />
    </td>
  </tr>
  <tr>
    <td>
    <label>Message</label>
    </td>
    <td>
    <input type="text" onChange={handleOnChange("message")} value={message} />
    </td>
  </tr>
  </tbody>
  </table>
  <button id="saveButton" onClick={createCoupon}>Save</button>
  <button id="updateButton" onClick={updateCoupon}>Update</button>
    <button onClick={toggleCancelFlag}>Cancel</button>
</div>

        </>
    );
}