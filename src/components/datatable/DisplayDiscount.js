import React, { useState } from "react";
import firebaseConfig from "../../configs/firebaseConfig";

export default function DisplayDiscount({ payments, selectedAcademyID }) {
  const [inputValue, setInputValue] = useState("");
  const [tableDetails, setTableDetails] = useState(payments);
  const [showInputTag, setShowInputTag] = useState(false);
  const [showDiscountResult, setshowDiscountResult] = useState(false);
  const [discountTable, setDiscountTable] = useState([
    {
      name: "Beginner",
      monthly: 0,
      quaterly: 0,
      semiAnnual: 0,
      annually: 0,
    },
    {
      name: "Intermediate",
      monthly: 0,
      quaterly: 0,
      semiAnnual: 0,
      annually: 0,
    },
    {
      name: "Advanced",
      monthly: 0,
      quaterly: 0,
      semiAnnual: 0,
      annually: 0,
    },
    {
      name: "proffesional",
      monthly: 0,
      quaterly: 0,
      semiAnnual: 0,
      annually: 0,
    },
  ]);

  const handleDiscountChanged = (index, key, event) => {
    setshowDiscountResult(false);
    console.log(index, key, event.target.value);
    setDiscountTable((old) => {
      old[index][key] = event.target.value;
      return old;
    });
  };

  const handleCommonDiscount = (event) => {
    console.log(event.target.value);
    setshowDiscountResult(false);
    setShowInputTag(false);
    setInputValue(event.target.value);

    setDiscountTable((old) => {
      old.forEach((table, index) => {
        Object.keys(table).map((key) => {
          if (key != "name") {
            old[index][key] = event.target.value;
          }
        });
      });
      return old;
    });
  };

  const onSubmitDiscount = () => {
    console.log("submitted");
    setshowDiscountResult(true);
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
        <h1>Discount Table</h1>

        <div>
          Enter Common Discount in %:
          <input
            type="text"
            onChange={handleCommonDiscount}
            value={inputValue}
          />
          {/* <button onClick={() => submitDiscount()}>Submit</button> */}
        </div>

        <div>
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
              {discountTable.map((table, index) => {
                return (
                  <>
                    <tr>
                      <td>{table.name}</td>
                      <td onClick={(e) => setShowInputTag(true)}>
                        {showInputTag ? (
                          <input
                            type="number"
                            onChange={(value) =>
                              handleDiscountChanged(index, "monthly", value)
                            }
                            defaultValue={table.monthly}
                          />
                        ) : (
                          table.monthly
                        )}
                      </td>
                      <td onClick={(e) => setShowInputTag(true)}>
                        {showInputTag ? (
                          <input
                            type="number"
                            onChange={(value) =>
                              handleDiscountChanged(index, "quaterly", value)
                            }
                            defaultValue={table.quaterly}
                          />
                        ) : (
                          table.monthly
                        )}
                      </td>
                      <td onClick={(e) => setShowInputTag(true)}>
                        {showInputTag ? (
                          <input
                            type="number"
                            onChange={(value) =>
                              handleDiscountChanged(index, "semiAnnual", value)
                            }
                            defaultValue={table.semiAnnual}
                          />
                        ) : (
                          table.semiAnnual
                        )}
                      </td>
                      <td onClick={(e) => setShowInputTag(true)}>
                        {showInputTag ? (
                          <input
                            type="number"
                            onChange={(value) =>
                              handleDiscountChanged(index, "annually", value)
                            }
                            defaultValue={table.annually}
                          />
                        ) : (
                          table.annually
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
          <button onClick={() => onSubmitDiscount()}>Submit</button>

          <h1>Final Price</h1>
        </div>
        {showDiscountResult ? (
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
              {tableDetails.map((table, index) => {
                console.log(discountTable[index].monthly);
                return (
                  <>
                    <tr>
                      <td>{table.name}</td>
                      <td>
                        {table.monthly -
                          table.monthly * (discountTable[index].monthly / 100)}
                      </td>
                      <td>
                        {table.quaterly -
                          table.quaterly * (discountTable[index].monthly / 100)}
                      </td>
                      <td>
                        {table.semiAnnual -
                          table.semiAnnual *
                            (discountTable[index].monthly / 100)}
                      </td>
                      <td>
                        {table.annually -
                          table.annually * (discountTable[index].monthly / 100)}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
