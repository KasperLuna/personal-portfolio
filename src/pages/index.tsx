import { type NextPage } from "next";
import Head from "next/head";
import About from "~/sections/About";
import Contact from "~/sections/Contact";
import Hero from "~/sections/Hero";
import Navbar from "~/sections/Navbar";
import Projects from "~/sections/Projects";
import Skills from "~/sections/Skills";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Kasper Luna</title>
        <meta
          name="description"
          content="I'm Kasper Luna, a software engineer based in the Philippines. Experienced in frontend and backend system design, project management, and development."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default Home;
