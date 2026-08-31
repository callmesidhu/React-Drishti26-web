export default function DrishTees() {
  return (
    <section className="relative w-full bg-black py-20">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-6 px-[clamp(20px,5vw,71px)]">
        <h2 className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(32px,5vw,64px)] font-normal leading-[1.1] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
          GRAB YOUR DRISH-TEES!!
        </h2>
        <video
          className="w-full max-w-[900px] self-center rounded-xl border border-white/15 object-cover shadow-[0_0_30px_rgba(212,175,55,0.2)]"
          src="/home/drishtee.webm"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Drishtees promotional video"
        />
      </div>
    </section>
  );
}
