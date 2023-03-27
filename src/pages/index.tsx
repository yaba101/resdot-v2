import { type NextPage } from "next";
import WelcomePage from "@/components/WelcomePage";
import Navbar from "@/components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <WelcomePage />
    </>
  );
};

export default Home;
