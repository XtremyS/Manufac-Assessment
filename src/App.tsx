import "./styles.css"; // Import the CSS file
import wineData from "./utils/wineData.json";
import WineStats from "./component/wineStats";

// App component
const App: React.FC = () => {
  return (
    <div>
      <h1>Wine Statistics</h1>
      <WineStats data={wineData} />
    </div>
  );
};

export default App;
