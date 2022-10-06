import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";
import Head from "next/head";

const Layout = (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
