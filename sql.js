const { Client } = require("pg");

const client = new Client({
  user: "wind",
  host: "localhost",
  database: "weather_data",
  password: "0880",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to database", err));

const insertTemperatures = async (temperature, recordedAt) => {
  try {
    const query = `INSERT INTO temperature_records (temperature, recorded_at) VALUES ($1, $2) RETURNING *`;
    const values = [temperature, recordedAt];
    const res = await client.query(query, values);
    console.log(`INSERTING INTO TABLE temperature_records:`, res.rows[0]);
  } catch (err) {
    console.error(`Error inseting into table`, err);
  }
};

const getTemperaturesByDate = async (date) => {
  const query =
    "SELECT * FROM temperature_records WHERE DATE(recorded_at) = $1";
  const values = [date];
  try {
    const res = await client.query(query, values);
    if (res.rows.length === 0) {
      console.log(`No temperature records found for ${date}`);
    } else {
      console.log(`Temperature records for ${date}`);
      res.rows.forEach((row) => console.log(row));
    }
  } catch (err) {
    console.error(`Error retrieving date`, err);
  }
};

const closeConnection = () => {
  client
    .end()
    .then(() => console.log("Disconnected from database"))
    .catch((err) => console.error("Error disconnecting from database", err));
};

module.exports = { insertTemperatures, getTemperaturesByDate, closeConnection };
