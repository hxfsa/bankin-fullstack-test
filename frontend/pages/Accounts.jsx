import { Button, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  const API = import.meta.env.VITE_BACKEND_API;

  const columns = [
    {
      title: "Nom du compte",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Solde",
      dataIndex: "balance",
      key: "balance",
    },
  ];

  const getAccounts = () => {
    axios
      .get(API + "/getAccounts")
      .then((res) => {
        setAccounts(res.data.accounts);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={accounts} />

      <Button
        style={{
          backgroundColor: "#6562FD",
          borderColor: "#6562FD",
          color: "white",
        }}
      >
        Optimiser mon épargne
      </Button>
    </>
  );
};

export default Accounts;
