import { useState } from "react";
import data from "./SampleData.json";
import "./App.css";

function App() {
  const [leftItems, setLeftItems] = useState(data.map((val) => val.name));
  const [rightItems, setRightItems] = useState([]);

  const dragOver = (e) => {
    console.log("eeee", e);
    e.preventDefault();
  };

  const itemDragStart = (e, item, source) => {
    // console.log(e, item, source, "eitemsource");
    e.dataTransfer.setData("text/plain", item);
    e.dataTransfer.setData("source", source);
  };

  const itemDrop = (e, target) => {
    console.log("etarget", e, target);
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    const source = e.dataTransfer.getData("source");
    console.log(source, "source123");
    if (target !== source) {
      if (target === "left") {
        if (source === "right") {
          const updatedRightItems = rightItems.filter(
            (rightItem) => rightItem !== item
          );
          setRightItems(updatedRightItems);
        }
        setLeftItems([...leftItems, item]);
      } else if (target === "right") {
        if (source === "left") {
          const updatedLeftItems = leftItems.filter(
            (leftItem) => leftItem !== item
          );
          setLeftItems(updatedLeftItems);
        }
        setRightItems([...rightItems, item]);
      }
    }
  };
  return (
    <div className="app">
      <div>
        <h3>Industries</h3>
        <div className="input__field">
          <p>Choose from</p>
          <input type="text" placeholder="Search" />
        </div>
        <div
          className="left__container"
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => itemDrop(e, "left")}
        >
          {leftItems.map((item, i) => (
            <div
              key={i}
              className="left__items"
              draggable
              onDragStart={(e) => itemDragStart(e, item, "left")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>Selected</h3>

        <div
          onDragOver={(e) => dragOver(e)}
          onDrop={(e) => itemDrop(e, "right")}
          className="right__container"
        >
          {rightItems.map((item, index) => (
            <div
              className="right__items"
              key={index}
              draggable
              onDragStart={(e) => itemDragStart(e, item, "right")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
