import React from "react";
import Head from "next/head";
import Layout from "@/components/layout/Layout";
import DashboardPage from "@/components/templates/DashboardPage/DashboardPage";
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck";

function Dashboard() {
  const { shouldLoadContent } = useRedirectByUserCheck();

  return (
    <>
      <Head>
        <title>Аква Термикс | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent &&
        <Layout>
          <main>
            <DashboardPage />
            <div className="overlay" />
          </main>
        </Layout>
      }
    </>
  );
}

export default Dashboard;
