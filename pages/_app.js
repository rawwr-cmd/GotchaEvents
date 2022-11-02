import Head from "next/head";
import Layout from "../components/layout/layout";
import "../styles/globals.css";
import { NotificationContextProvider } from "../store/notification-context";
//wrapping will mack all the components utilize  our context
//general head setup
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <title>Gotcha Events</title>
          <meta name="description" content="get your events here" />
          <meta
            name="viewpoint"
            content="width=device-width, initial-scale=1"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
