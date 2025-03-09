import { Table } from "antd";
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

  const getTransactions = () => {
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
    getTransactions();
  }, []);

  return <Table columns={columns} dataSource={accounts} />;
};

export default Accounts;
