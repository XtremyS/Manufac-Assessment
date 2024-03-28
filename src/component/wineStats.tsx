// WineStats component
import { useState, useEffect } from "react";

const WineStats: React.FC<{ data: any[] }> = ({ data }) => {
  // Calculate mean
  const calculateMean = (data: number[]) => {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return sum / data.length;
  };

  // Calculate median
  const calculateMedian = (data: number[]) => {
    const sortedData = [...data].sort((a, b) => a - b);
    const middle = Math.floor(sortedData.length / 2);
    if (sortedData.length % 2 === 0) {
      return (sortedData[middle - 1] + sortedData[middle]) / 2;
    } else {
      return sortedData[middle];
    }
  };

  // Calculate mode
  const calculateMode = (data: number[]) => {
    const counts: { [key: number]: number } = {};
    data.forEach((val) => {
      counts[val] = (counts[val] || 0) + 1;
    });
    let mode: number | null = null;
    let maxCount = 0;
    Object.entries(counts).forEach(([key, count]) => {
      const numCount = parseInt(key);
      if (count > maxCount) {
        mode = numCount;
        maxCount = count;
      }
    });
    return maxCount > 1 ? mode : 0;
  };

  const [flavanoidsStats, setFlavanoidsStats] = useState<{
    [key: string]: { mean: number; median: number; mode: number };
  }>({});
  const [gammaStats, setGammaStats] = useState<{
    [key: string]: { mean: number; median: number; mode: number };
  }>({});

  useEffect(() => {
    // Extract Flavanoids and Gamma data for different classes
    const flavanoidsData: { [key: string]: number[] } = {};
    const gammaData: { [key: string]: number[] } = {};

    data.forEach((item) => {
      const className = `Class ${item.Alcohol}`;
      if (!flavanoidsData[className]) {
        flavanoidsData[className] = [];
        gammaData[className] = [];
      }
      flavanoidsData[className].push(Number(item.Flavanoids));
      gammaData[className].push(
        (Number(item.Ash) * Number(item.Hue)) / Number(item.Magnesium)
      );
    });

    // Calculate Flavanoids statistics for each class
    const flavanoidsStatsByClass: {
      [key: string]: { mean: number; median: number; mode: number };
    } = {};
    Object.entries(flavanoidsData).forEach(([className, classData]) => {
      const mean = calculateMean(classData);
      const median = calculateMedian(classData);
      const mode = calculateMode(classData);
      flavanoidsStatsByClass[className] = { mean, median, mode: mode || 0 }; // Provide a default value for mode
    });

    // Calculate Gamma statistics for each class
    const gammaStatsByClass: {
      [key: string]: { mean: number; median: number; mode: number };
    } = {};
    Object.entries(gammaData).forEach(([className, classData]) => {
      const mean = calculateMean(classData);
      const median = calculateMedian(classData);
      const mode = calculateMode(classData);
      gammaStatsByClass[className] = { mean, median, mode: mode || 0 }; // Provide a default value for mode
    });

    setFlavanoidsStats(flavanoidsStatsByClass);
    setGammaStats(gammaStatsByClass);
  }, [data]);

  return (
    <div>
      <h2>Flavonoids Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(flavanoidsStats).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavonoids Mean</td>
            {Object.values(flavanoidsStats).map((stats, index) => (
              <td key={index}>{stats.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavonoids Median</td>
            {Object.values(flavanoidsStats).map((stats, index) => (
              <td key={index}>{stats.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Flavonoids Mode</td>
            {Object.values(flavanoidsStats).map((stats, index) => (
              <td key={index}>{stats.mode}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Gamma Stats</h2>
      <table>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(gammaStats).map((className) => (
              <th key={className}>{className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {Object.values(gammaStats).map((stats, index) => (
              <td key={index}>{stats.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.values(gammaStats).map((stats, index) => (
              <td key={index}>{stats.median.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.values(gammaStats).map((stats, index) => (
              <td key={index}>{stats.mode}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WineStats;
