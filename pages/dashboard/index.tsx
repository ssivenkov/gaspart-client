import Head from "next/head";
import Header from "@/components/modules/Header/Header";

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
      <Header />
      <main>
        <h1>Dashboard</h1>
        <div className="overlay" />
      </main>
    </>
  );
}

export default Dashboard;