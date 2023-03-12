import { useState } from "react";

const BASE_URL = "https://robohash.org";

function App() {
  return <RobotList />;
}

const RobotList = () => {
  const [robotList, setRobotList] = useState([]);
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (robotList.includes(input)) {
      throw new Error("Item is already added to the list!");
    }
    if (input === "") {
      throw new Error("You can not submit an empty string!");
    }
    setRobotList((prevState) => [...prevState, input]);
    setInput("");
  };

  const handleRobotClick = (id) => {
    setRobotList((prevState) => prevState.filter((item) => item !== id));
  };

  return (
    <div>
      <div className="center__grid__wfull">
        <form onSubmit={handleSubmit}>
          <label htmlFor="robot-input">Robot string</label>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            id="robot-input"
          />
          <button type="submit">Enter</button>
        </form>
      </div>
      <div className="robot__grid center__grid__wfull">
        {robotList?.length > 0 &&
          robotList.map((item, index) => {
            return (
              <div
                key={item}
                onClick={() => handleRobotClick(item)}
                className="pointer"
              >
                <img src={`${BASE_URL}/${item}`} alt="Robot" />
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default App;
