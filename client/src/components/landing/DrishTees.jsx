export default function DrishTees() {
  return (
    <section className="relative w-full overflow-visible py-10 sm:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="relative mt-4 grid items-end gap-4 lg:mt-8 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="relative mx-auto flex h-[300px] w-full max-w-[620px] items-end justify-center sm:h-[380px] md:h-[500px] xl:h-[620px]">
            <img
              src="/home/tshirt-base.png"
              alt=""
              aria-hidden="true"
              className="absolute bottom-[-12px] left-1/2 w-[86%] max-w-[440px] -translate-x-1/2 object-contain"
              style={{ animation: 'float-base 7s ease-in-out infinite' }}
            />
            <video
              src="/home/drishtee.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Drishtee T-shirt promotional video"
              className="relative z-10 h-[78%] w-auto max-w-[520px] object-contain pointer-events-none"
              style={{ transform: 'translateY(-160px)', animation: 'float-shirt 6.5s ease-in-out infinite' }}
            />
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-visible sm:min-h-[300px] md:min-h-[360px] lg:min-h-[500px]">
            <img
              src="/home/circle-half.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-0 h-[100%] w-[100%] max-w-[none] object-cover object-right opacity-95"
              style={{ transform: 'scaleX(0.995)' }}
            />

            <div className="relative z-10 flex w-full max-w-[560px] flex-col items-start justify-center px-2 text-left lg:px-0 lg:pr-10">
              <h2 className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(28px,4vw,62px)] font-normal leading-[0.9] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
                GRAB YOUR TEES NOW!!
              </h2>

              <p className="mt-4 max-w-[460px] text-[0.85rem] leading-relaxed text-[#f3e7c9]/90 sm:text-[0.95rem] lg:text-[1.02rem]">
                The future is never built by wiping away what came before. It grows by layering fresh innovation over the blueprints of our history, carrying forward the weight of human effort beneath every modern breakthrough. At CET, that same spirit lives in the way students come together, build, adapt, and keep pushing the campus forward, one idea, one solution, and one change at a time. We do not just watch the future unfold. We step into the unknown, look deeper, and turn the unseen into real progress.
              </p>

              <button
                type="button"
                className="mt-6 inline-flex items-center justify-center rounded-full border border-[#d4af37]/70 bg-[linear-gradient(180deg,#e7c567_0%,#d4af37_45%,#b98b1b_100%)] px-8 py-2.5 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-[#0d0d0d] shadow-[0_0_18px_rgba(212,175,55,0.28)] transition-transform duration-200 hover:scale-[1.02]"
              >
                Get Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

<style>{`
  @keyframes float-shirt {
    0%, 100% { transform: translateY(-160px); }
    50% { transform: translateY(-190px); }
  }

  @keyframes float-base {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`}</style>
