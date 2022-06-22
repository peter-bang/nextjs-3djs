import type { NextPage } from "next";
import Head from "next/head";
import { Container } from "@mui/material";
import tw, { styled } from "twin.macro";
import React, { ReactElement, ReactNode } from "react";
import Layout from "../components/Layout";
import ThreeJS from "../components/threejs";
import ThreeJS_TrackballControls from "../components/threejs_trackballcontrols";

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/hello");
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: data,
  };
};

const TDContrainer = tw.div`
flex
justify-center
`;

type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactElement;
};

const MainContainer = styled(Container)(() => [tw`text-center`]);

const Home: NextPageWithLayout<{ name: string }> = ({ name }) => {
  return (
    <MainContainer>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>안녕 여러분!!</h1>
        <TDContrainer>
          <ThreeJS></ThreeJS>
          <ThreeJS_TrackballControls></ThreeJS_TrackballControls>
        </TDContrainer>
      </main>
    </MainContainer>
  );
};
export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
