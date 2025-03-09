const axios = require("axios");
require("dotenv").config();
const express = require("express");
const app = express();

app.get("/getAccounts", async (req, res) => {
  //Etape 1: Authentification d'un utilisateur

  try {
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
        return response.data.access_token;
      } catch (err) {
        console.error(err);
      }
    };

    //Etape 2: Récupération des comptes
    const getAccounts = async (accessToken) => {
      const url = "https://sync.bankin.com/v2/accounts";
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        "bankin-version": "2019-08-22",
        "bankin-device": "26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5",
      };

      try {
        const response = await axios.get(url, { headers });
        return response.data.resources;
      } catch (err) {
        console.error(err);
      }
    };

    //récupération du token de manière dynamique
    const token = await authenticate();

    //récupération des comptes
    const accounts = await getAccounts(token);

    //total + arrondi à la centième supérieure
    const sum = accounts.reduce((sum, account) => sum + account.balance, 0);
    const sumRounded = Math.ceil(sum / 100) * 100;

    //Etape 3 : servir l'information

    //filtre pour récupérer uniquement le nom et solde
    const filteredAccounts = accounts.map((acc) => ({
      name: acc.name,
      balance: acc.balance,
    }));

    //envoi de la réponse attendue au format JSON, vérication sur la route getAccounts : j'ai bien le résultat attendu
    res.json({
      rounded_sum: sumRounded,
      accounts: filteredAccounts,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});

// serveur
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
