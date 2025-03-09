const axios = require("axios");
require("dotenv").config();

const authenticate = async () => {
  const url = "https://sync.bankin.com/v2/authenticate";
  const data = {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  };
  const headers = {
    "bankin-version": "2019-08-22",
    "bankin-device": "26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5",
  };

  try {
    const response = await axios.post(url, data, { headers });
    console.log("token:", response.data.access_token);
    return response.data.access_token;
  } catch (err) {
    console.error(err);
  }
};

authenticate();
