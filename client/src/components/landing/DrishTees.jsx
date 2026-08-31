export default function DrishTees() {
  return (
    <section className="relative w-full overflow-visible bg-black py-10 sm:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <h2 className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text text-center font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(30px,5vw,72px)] font-normal leading-[0.95] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
          GRAB YOUR DRISH-TEES!!
        </h2>

        <div className="relative mt-4 grid items-end gap-4 lg:mt-8 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="relative mx-auto flex h-[300px] w-full max-w-[620px] items-end justify-center sm:h-[380px] md:h-[500px] xl:h-[620px]">
            <img
              src="/home/tshirt-base.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-[-12px] left-1/2 w-[86%] max-w-[440px] -translate-x-1/2 object-contain"
            />
            <img
              src="/home/tshirt-front.png"
              alt="Drishti T-shirt"
              className="relative z-10 h-[78%] w-auto max-w-[520px] object-contain"
              style={{ transform: 'translateY(-34px)', animation: 'float 7s ease-in-out infinite' }}
            />
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-visible sm:min-h-[300px] md:min-h-[360px] lg:min-h-[500px]">
            <img
              src="/home/circle-half.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-0 h-full w-auto max-w-[none] object-contain object-right opacity-95"
            />

            <div className="relative z-10 w-full max-w-[560px] px-2 text-center lg:px-0 lg:pr-10 lg:text-left">
              <p className="text-[0.9rem] leading-relaxed text-[#f3e7c9]/90 sm:text-[1rem] lg:text-[1.08rem]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

<style>{`
  @keyframes float {
    0%, 100% { transform: translateY(-34px); }
    50% { transform: translateY(-42px); }
  }
`}</style>
