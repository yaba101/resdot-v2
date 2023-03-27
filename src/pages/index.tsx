import { type NextPage } from "next";
// import Head from "next/head";
// import Link from "next/link";

import { api } from "@/utils/api";
import WelcomePage from "@/components/WelcomePage";
import Navbar from "@/components/Navbar";

const Home: NextPage = () => {
  // const { data } = api.example.getAll.useQuery();
  // if (!data) return null;

  return (
    <>
      <Navbar />
      <WelcomePage />
    </>
  );
};

export default Home;
