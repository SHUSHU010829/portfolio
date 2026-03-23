import { TypingAnimation } from "@/components/ui/typing-animation";

export default function Hero() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-6 px-10 py-12 sm:py-20">
      <h2 className="font-primary text-center text-[32px] font-semibold leading-tight text-foreground">
        <TypingAnimation duration={60}>
          {"// Building digital experiences"}
        </TypingAnimation>
      </h2>
      <p className="font-secondary text-center text-base text-muted-foreground">
        <TypingAnimation delay={1800} duration={80}>
          Frontend Developer
        </TypingAnimation>
      </p>
    </section>
  );
}
