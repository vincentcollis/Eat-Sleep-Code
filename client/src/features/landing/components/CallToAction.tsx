import { Container } from "./Container";
import backgroundImage from "../../../images/background-faqs.jpg";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <img
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-900">
            It’s time to take control of your mastery of data structures and
            algorithms.
          </p>
        </div>
      </Container>
    </section>
  );
}
