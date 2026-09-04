import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EVENT_DATE = new Date(2026, 8, 18, 0, 0, 0);
const NANOBOT_IMAGE = "/home/nanobot.png";

const getTimeRemaining = () => Math.max(0, EVENT_DATE.getTime() - Date.now());

const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const timeUnits = [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"));

  if (days < 1) {
    return timeUnits.join(" : ");
  }

  return [days, ...timeUnits]
    .map((value) => String(value).padStart(2, "0"))
    .join(" : ");
};

export default function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);
  const sectionRef = useRef(null);
  const leftBotRef = useRef(null);
  const rightBotRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    const ctx = gsap.context(() => {
      // Extreme smooth parallax for left nanobot
      gsap.fromTo(
        leftBotRef.current,
        { y: -120 },
        {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Extreme smooth parallax for right nanobot (opposite direction)
      gsap.fromTo(
        rightBotRef.current,
        { y: 120 },
        {
          y: -120,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );

      // Subtle smooth parallax for the timer
      gsap.fromTo(
        timerRef.current,
        { y: -30, scale: 0.95 },
        {
          y: 30,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    });

    return () => {
      window.clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-30 isolate flex min-h-[260px] w-full items-center justify-center overflow-visible bg-black px-5 py-16 sm:min-h-[360px] sm:py-20"
      aria-labelledby="countdown-title"
    >
      <h2 id="countdown-title" className="sr-only">
        Countdown to Drishti 2026
      </h2>

      <img
        ref={leftBotRef}
        className="pointer-events-none absolute -left-[clamp(24px,3vw,44px)] -top-[clamp(24px,3vw,44px)] z-20 w-[clamp(150px,18vw,280px)] max-w-none"
        src={NANOBOT_IMAGE}
        alt=""
        aria-hidden="true"
      />
      <img
        ref={rightBotRef}
        className="pointer-events-none absolute -bottom-[clamp(24px,3vw,44px)] -right-[clamp(24px,3vw,44px)] z-20 w-[clamp(150px,18vw,280px)] max-w-none -scale-x-100"
        src={NANOBOT_IMAGE}
        alt=""
        aria-hidden="true"
      />

      <time
        ref={timerRef}
        className="relative z-10 text-center font-['Clash_Display-Medium',Helvetica] text-[clamp(2.4rem,9.5vw,7.5rem)] font-medium leading-none tracking-[0] text-gold-gradient"
        dateTime="2026-09-18T00:00:00"
      >
        {formatTime(timeRemaining)}
      </time>
    </section>
  );
}
