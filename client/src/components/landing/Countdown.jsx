import { useEffect, useState } from "react";

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

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[260px] w-full items-center justify-center overflow-hidden bg-black px-5 py-16 sm:min-h-[360px] sm:py-20"
      aria-labelledby="countdown-title"
    >
      <h2 id="countdown-title" className="sr-only">
        Countdown to Drishti 2026
      </h2>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black via-black/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black via-black/80 to-transparent"
        aria-hidden="true"
      />

      <img
        className="pointer-events-none absolute -left-[clamp(24px,3vw,44px)] -top-[clamp(24px,3vw,44px)] z-0 w-[clamp(150px,18vw,280px)] max-w-none"
        src={NANOBOT_IMAGE}
        alt=""
        aria-hidden="true"
      />
      <img
        className="pointer-events-none absolute -bottom-[clamp(24px,3vw,44px)] -right-[clamp(24px,3vw,44px)] z-0 w-[clamp(150px,18vw,280px)] max-w-none -scale-x-100"
        src={NANOBOT_IMAGE}
        alt=""
        aria-hidden="true"
      />

      <time
        className="relative z-10 text-center font-['Clash_Display-Medium',Helvetica] text-[clamp(2.4rem,9.5vw,7.5rem)] font-medium leading-none tracking-[0] text-gold-gradient"
        dateTime="2026-09-18T00:00:00"
      >
        {formatTime(timeRemaining)}
      </time>
    </section>
  );
}
