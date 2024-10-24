"use strict";
const axios = require("axios");
const normalize = require("./normalize");
const min = require("./min");

const responses = [];
const fetch = async (apiUrls) => {
  try {
    for (let turn = 0; turn < 2; turn++) {
      const response = await axios.get(apiUrls[`url${turn + 1}`]);
      responses.push(normalize(turn, response));
    }
    await min(responses);
  } catch (err) {
    console.error("error catching data ", err);
  }
};

module.exports = { fetch, responses };
