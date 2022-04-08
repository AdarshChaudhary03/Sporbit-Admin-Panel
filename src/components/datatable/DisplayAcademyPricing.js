import React, { useState } from "react";
import firebaseConfig from "../../configs/firebaseConfig";

export default function DisplayAcademyPricing({ payments, selectedAcademyID }) {
  const bMonthly = 4000,
    iMonthly = 6000,
    aMonthly = 7500,
    pMonthly = 10000;
    console.log(payments);
    console.log(selectedAcademyID);
  const [tableDetails, setTableDetails] = useState(
    payments = [
          {
            name: "Beginner",
            sports: "Badminton",
            monthly: bMonthly,
            quaterly: bMonthly * 3 * 0.9,
            semiAnnual: bMonthly * 6 * 0.75,
            annually: bMonthly * 12 * 0.6,
          },
          {
            name: "Intermediate",
            sports: "Tennis",
            monthly: iMonthly,
            quaterly: iMonthly * 3 * 0.9,
            semiAnnual: iMonthly * 6 * 0.75,
            annually: iMonthly * 12 * 0.6,
          },
          {
            name: "Advanced",
            sports: "Tennis",
            monthly: aMonthly,
            quaterly: aMonthly * 3 * 0.9,
            semiAnnual: aMonthly * 6 * 0.75,
            annually: aMonthly * 12 * 0.6,
          },
          {
            name: "proffesional",
            sports: "Tennis",
            monthly: pMonthly,
            quaterly: pMonthly * 3 * 0.9,
            semiAnnual: pMonthly * 6 * 0.75,
            annually: pMonthly * 12 * 0.6,
          },
          
        ]
  );


  function filterByID(item) {
    if (item.sports=='Tennis') {
      return true
    }
    return false
  }

  const handleItemChanged = (index, key, data) => {
    // event.preventDefault();

    console.log(index, key, data.target.value);
    setTableDetails((old) => {
      old[index][key] = data.target.value;
      return old;
    });
  };
  const onSubmit = () => {
    firebaseConfig
      .firestore()
      .collection("academies")
      .doc(selectedAcademyID)
      .update({
        payments: tableDetails,
      });
  };

  return (
    <>
      <div>
        <h1>Payment Structure</h1>
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
            {Object.keys(tableDetails).map((table, index) => {
              payments = payments.filter(() => filterByID);
              console.log(payments[index]);
              return (
                <>
                  <tr>
                    <td>{payments[index].name}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "monthly", value)
                        }
                        defaultValue={table.monthly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "quaterly", value)
                        }
                        defaultValue={table.quaterly}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "semiAnnual", value)
                        }
                        defaultValue={table.semiAnnual}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        onChange={(value) =>
                          handleItemChanged(index, "annually", value)
                        }
                        defaultValue={table.annually}
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
