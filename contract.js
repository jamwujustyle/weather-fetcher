const { ethers } = require("ethers");
const { responses } = require("./fetchData");
const { insertTemperatures } = require("./sql");

const data = {
  provider: new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/d6IUZ9j62wXAM2UH4nt8Bh_UGb1w5aHv"
  ),
  privateKey:
    "00be00eb4bbd4c9f28e744f01efbeec08914f252ae7669c50f441905331a835b",
  contractAddress: "0xb3fAdff0464273d0E572aF69757B4A7E43b83747",
};
const abi = [
  "function addTemperature(int256 _temperature)",
  "function getAllTemperatures() public view returns(int256[])",
  "function getLatestTemperature() public view returns(int256)",
];

const wallet = new ethers.Wallet(data.privateKey, data.provider);
const contract = new ethers.Contract(data.contractAddress, abi, wallet);

// Function to add temperatures to the contract
const addTemperature = async (temperature) => {
  try {
    const tx = await contract.addTemperature(temperature);
    await tx.wait();
    console.log(`From smart contract: Added temperature ${temperature}`);
    const recordedAt = new Date();
    await insertTemperatures(temperature, recordedAt); // Store to PostgreSQL
  } catch (err) {
    console.error("Error adding temperature:", err);
  }
};

// Function to retrieve all temperatures from the contract
const getAllTemperatures = async () => {
  try {
    const temperatures = await contract.getAllTemperatures();
    console.log("All temperatures from smart contract:", temperatures);
  } catch (err) {
    console.error("Error retrieving all temperatures:", err);
  }
};

// Function to get the latest temperature (optional)
const getLatestTemperature = async () => {
  try {
    const latestTemperature = await contract.getLatestTemperature();
    console.log("Latest temperature from smart contract:", latestTemperature);
  } catch (err) {
    console.error("Error retrieving the latest temperature:", err);
  }
};

module.exports = { addTemperature, getAllTemperatures, getLatestTemperature };
