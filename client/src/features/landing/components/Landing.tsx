import { CallToAction } from "./CallToAction";
import { Hero } from "./Hero";
import { PrimaryFeatures } from "./PrimaryFeatures";

const Landing = () => {
  return (
    <>
      <main>
        <Hero />
        <PrimaryFeatures />
        <CallToAction />
      </main>
    </>
  );
};

export default Landing;
