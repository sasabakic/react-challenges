import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  return <GenerateList />;
}

const GenerateList = () => {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    handleActivityGeneration();
  }, []);

  const handleActivityGeneration = () => {
    axios.get("https://www.boredapi.com/api/activity").then(
      (response) => {
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        } else {
          setActivityList((prevState) => [...prevState, response.data]);
        }
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  };

  return (
    <div>
      <button onClick={handleActivityGeneration}>Generate activity</button>
      {activityList?.length > 0
        ? activityList.map((item, index) => {
            return <ExpandableListItem item={item} key={item.key} />;
          })
        : null}
    </div>
  );
};

const ExpandableListItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prevState) => !prevState);
  };
  return (
    <div>
      <p>{item.activity}</p>
      <button onClick={handleExpand}>{expanded ? "Collapse" : "Expand"}</button>
      {expanded
        ? Object.entries(item).map(([key, value], index) => {
            return (
              <div>
                {key}: {value}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default App;
