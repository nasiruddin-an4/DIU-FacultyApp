import Image from "next/image";
import Hero from "./components/Hero";
import FacultyFilter from "./components/FacultyFilter";

export default function Home() {
  return (
    <div>
      <Hero />
      <FacultyFilter />
    </div>
  );
}
