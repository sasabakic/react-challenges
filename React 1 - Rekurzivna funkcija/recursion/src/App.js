import React, { useState } from "react";

function App() {
  const [nestedObjected, setNestedObject] = useState({
    taxi: "a car licensed to transport passengers in return for payment of a fare",
    food: {
      sushi:
        "a traditional Japanese dish of prepared rice accompanied by seafood and vegetables",
      apple: {
        Honeycrisp:
          "an apple cultivar developed at the MAES Horticultural Research Center",
        Fuji: "an apple cultivar developed by growers at Tohoku Research Station",
      },
    },
  });

  return (
    <div style={{ margin: "auto", width: "70%", paddingTop: 40 }}>
      <DisplayNested nestedObjected={nestedObjected} />
    </div>
  );
}

const DisplayNested = ({ nestedObjected }) => {
  const nesterFixer = (object) => {
    return Object.entries(object).map(([key, value]) => {
      if (typeof value !== "object") {
        return (
          <p key={key}>
            {key}:{value}
          </p>
        );
      } else {
        return (
          <div>
            <h2 key={key}>{key}:</h2>
            {/* {nesterFixer(value)} */}
            <DisplayNested nestedObjected={value} />
          </div>
        );
      }
    });
  };
  return <div> {nesterFixer(nestedObjected)}</div>;
};

export default App;
