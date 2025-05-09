import About from "~/sections/About";
import Contact from "~/sections/Contact";
import Hero from "~/sections/Hero";
import Navbar from "~/sections/Navbar";
import Projects from "~/sections/Projects";
import Skills from "~/sections/Skills";

export default function HomePage() {
    return (
        <main>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
        </main>
    );
}