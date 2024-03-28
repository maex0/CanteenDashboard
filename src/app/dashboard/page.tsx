"use client";

import React from "react";
import styles from "../page.module.css";

const getData = async () => {
  const response = await fetch("/api", {
    headers: {
      Accept: "application/json",
      method: "GET",
    },
  });

  if (response) {
    console.log(response);
    const data = await response.json();
    console.log(data);
  }
};

const Dashboard: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Dashboard</h1>
        <button onClick={getData}>Get Data</button>
      </div>
    </main>
  );
};

export default Dashboard;
