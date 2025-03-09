const axios = require("axios");
require("dotenv").config();


const accessToken = process.env.ACCESSTOKEN;

//Etape 1: Authentification d'un utilisateur
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

//Etape 2 : récupération des comptes
const getAccounts = async (accessToken) => {
  const url = "https://sync.bankin.com/v2/accounts";
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "bankin-version": "2019-08-22",
    "bankin-device": "26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5",
  };

  try {
    const response = await axios.get(url, { headers });
    console.log(response.data.resources)
    return response.data.resources ?? [];
  } catch (err) {
    console.error(err);
  }
};

getAccounts(accessToken);
