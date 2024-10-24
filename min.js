// min.js
"use strict";
const computeMin = async (responses) => {
  const totalTemp = responses.reduce(
    (acc, response) => acc + (response && response.temp ? response.temp : 0),
    0
  );

  const count = responses.filter(
    (response) => response && response.temp
  ).length;

  const averageTemp = count > 0 ? totalTemp / count : 0; // Avoid division by zero
  console.log(`Average temperature is ${averageTemp.toFixed(1)}°C`);
};

module.exports = computeMin;
