import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      <Layout>
        <main>
          <h1>Dashboard</h1>
          <div className="overlay" />
        </main>
      </Layout>
    </>
  );
}

export default Dashboard;
