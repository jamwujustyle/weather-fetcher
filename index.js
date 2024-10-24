"use strict";
const { fetch, responses } = require("./fetchData");
const readline = require("readline");
const configs = require("./config");
const { addTemperature, getAllTemperatures } = require("./contract");
const { getTemperaturesByDate, closeConnection } = require("./sql");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let choice;
let date;

const run = async () => {
  try {
    await fetch(configs.apiUrls);

    const minTemp = Math.min(...responses.map((res) => res.temp));

    await addTemperature(minTemp);

    await getAllTemperatures();

    rl.question("Want to search for a specific date? (y/n) ", (choice) => {
      if (choice.toLowerCase() === "y") {
        rl.question("Enter the date (YYYY-MM-DD): ", async (date) => {
          try {
            await getTemperaturesByDate(date);
          } catch (err) {
            console.error("Error fetching temperatures by date: ", err);
          } finally {
            rl.close();
          }
        });
      } else {
        rl.close();
      }
    });

    rl.on("close", () => {
      console.log("Exiting program.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error running fetch: ", err);
  }
};

run();
