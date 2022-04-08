import React, { useState } from "react";
import firebaseConfig from "../../configs/firebaseConfig";

export default function DisplayAcademyPricing1({ payments, selectedAcademyID, selectedSportID, isPackagePresent, selectedPackageID }) {
  const bMonthly = 0,
    iMonthly = 0,
    aMonthly = 0,
    pMonthly = 0;
    console.log("My Payment: ");
    console.log(payments);
    console.log("My ACademy ID: "+selectedAcademyID);
    console.log("My Sport ID: "+selectedSportID);
    console.log("IS Package present? "+isPackagePresent);
  const [tableDetails, setTableDetails] = useState(
    isPackagePresent ? payments : [
        {
            packageName: 'Gold Package',
            sports: selectedSportID,
            academy: firebaseConfig.firestore().collection(`academies`).doc(selectedAcademyID),
            packageDetails: [
                {
                    name: "Beginner",
                    monthly: bMonthly,
                    quaterly: bMonthly * 3 * 0.9,
                    semiAnnual: bMonthly * 6 * 0.75,
                    annually: bMonthly * 12 * 0.6,
                  },
                  {
                    name: "Intermediate",
                    monthly: iMonthly,
                    quaterly: iMonthly * 3 * 0.9,
                    semiAnnual: iMonthly * 6 * 0.75,
                    annually: iMonthly * 12 * 0.6,
                  },
                  {
                    name: "Advanced",
                    monthly: aMonthly,
                    quaterly: aMonthly * 3 * 0.9,
                    semiAnnual: aMonthly * 6 * 0.75,
                    annually: aMonthly * 12 * 0.6,
                  },
                  {
                    name: "Professional",
                    monthly: pMonthly,
                    quaterly: pMonthly * 3 * 0.9,
                    semiAnnual: pMonthly * 6 * 0.75,
                    annually: pMonthly * 12 * 0.6,
                  },        
            ],
            packageDetails1: [
              {
                  name: "Beginner",
                  monthly: bMonthly,
                  quaterly: bMonthly * 3 * 0.9,
                  semiAnnual: bMonthly * 6 * 0.75,
                  annually: bMonthly * 12 * 0.6,
                },
                {
                  name: "Intermediate",
                  monthly: iMonthly,
                  quaterly: iMonthly * 3 * 0.9,
                  semiAnnual: iMonthly * 6 * 0.75,
                  annually: iMonthly * 12 * 0.6,
                },
                {
                  name: "Advanced",
                  monthly: aMonthly,
                  quaterly: aMonthly * 3 * 0.9,
                  semiAnnual: aMonthly * 6 * 0.75,
                  annually: aMonthly * 12 * 0.6,
                },
                {
                  name: "Professional",
                  monthly: pMonthly,
                  quaterly: pMonthly * 3 * 0.9,
                  semiAnnual: pMonthly * 6 * 0.75,
                  annually: pMonthly * 12 * 0.6,
                },        
          ],
          packageDetails2: [
            {
                name: "Beginner",
                monthly: bMonthly,
                quaterly: bMonthly * 3 * 0.9,
                semiAnnual: bMonthly * 6 * 0.75,
                annually: bMonthly * 12 * 0.6,
              },
              {
                name: "Intermediate",
                monthly: iMonthly,
                quaterly: iMonthly * 3 * 0.9,
                semiAnnual: iMonthly * 6 * 0.75,
                annually: iMonthly * 12 * 0.6,
              },
              {
                name: "Advanced",
                monthly: aMonthly,
                quaterly: aMonthly * 3 * 0.9,
                semiAnnual: aMonthly * 6 * 0.75,
                annually: aMonthly * 12 * 0.6,
              },
              {
                name: "Professional",
                monthly: pMonthly,
                quaterly: pMonthly * 3 * 0.9,
                semiAnnual: pMonthly * 6 * 0.75,
                annually: pMonthly * 12 * 0.6,
              },        
        ],
            }          
        ]
  );

  const handleItemChanged = (index, key, data) => {
    console.log("Hit");
    // event.preventDefault();
    setTableDetails((old) => {
//        console.log(old[0].packageDetails[index][key]);
        old[0].packageDetails[index][key] = data.target.value;
      return old;
    });
  };

  const handleItemChanged1 = (index, key, data) => {
    console.log("Hit");
    // event.preventDefault();
    setTableDetails((old) => {
//        console.log(old[0].packageDetails[index][key]);
        old[0].packageDetails1[index][key] = data.target.value;
      return old;
    });
  };

  const handleItemChanged2 = (index, key, data) => {
    console.log("Hit");
    // event.preventDefault();
    setTableDetails((old) => {
//        console.log(old[0].packageDetails[index][key]);
        old[0].packageDetails2[index][key] = data.target.value;
      return old;
    });
  };

  const onSubmit = () => {
      if(!isPackagePresent){
        firebaseConfig
        .firestore()
        .collection("packages")
        .add(
          tableDetails[0]
        ).then(() => {
            alert("Package created successfully.");
            window.location.reload();
        });  
      }
      else{
          firebaseConfig
          .firestore()
          .collection(`packages`)
          .doc(selectedPackageID)
          .update({
            "packageDetails": tableDetails[0].packageDetails,
            "packageDetails1": tableDetails[0].packageDetails1
          }).then(() => {
            alert("Package updated successfully.");
            window.location.reload();
        }); 
      }
  };

  return (
    <>
      <div>
        <h1>Payment Structure</h1>


        <h2 align="left">2 Days/week</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Monthly</th>
              <th>Quaterly</th>
              <th>Semi-Annual</th>
              <th>Annually</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tableDetails[0].packageDetails2).map((table2, index2) => {
              return (
                <>
                  <tr>
                    <td>{tableDetails[0].packageDetails2[table2].name}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged2(index2, "monthly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails2[index2].monthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged2(index2, "quaterly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails2[index2].quaterly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged2(index2, "semiAnnual", value)
                        }
                        defaultValue={tableDetails[0].packageDetails2[index2].semiAnnual}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged2(index2, "annually", value)
                        }
                        defaultValue={tableDetails[0].packageDetails2[table2].annually}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>



        <h2 align="left">3 Days/week</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Monthly</th>
              <th>Quaterly</th>
              <th>Semi-Annual</th>
              <th>Annually</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tableDetails[0].packageDetails).map((table, index) => {
              return (
                <>
                  <tr>
                    <td>{tableDetails[0].packageDetails[table].name}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "monthly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails[index].monthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "quaterly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails[index].quaterly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "semiAnnual", value)
                        }
                        defaultValue={tableDetails[0].packageDetails[index].semiAnnual}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "annually", value)
                        }
                        defaultValue={tableDetails[0].packageDetails[table].annually}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>

        <h2 align="left">6 Days/week</h2>
        <table className="content-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>Monthly</th>
              <th>Quaterly</th>
              <th>Semi-Annual</th>
              <th>Annually</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(tableDetails[0].packageDetails1).map((table1, index1) => {
              return (
                <>
                  <tr>
                    <td>{tableDetails[0].packageDetails1[table1].name}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged1(index1, "monthly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails1[index1].monthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged1(index1, "quaterly", value)
                        }
                        defaultValue={tableDetails[0].packageDetails1[index1].quaterly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged1(index1, "semiAnnual", value)
                        }
                        defaultValue={tableDetails[0].packageDetails1[index1].semiAnnual}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged1(index1, "annually", value)
                        }
                        defaultValue={tableDetails[0].packageDetails1[table1].annually}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        
                <button onClick={() => onSubmit()}>Submit</button>
      </div>
    </>
  );
}
