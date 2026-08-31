export default function DrishTees() {
  return (
    <section className="relative w-full overflow-visible bg-black py-10 sm:py-12 lg:py-16 xl:py-20">
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
            <img
              src="/home/tshirt-front.png"
              alt="Drishti T-shirt"
              className="relative z-10 h-[78%] w-auto max-w-[520px] object-contain"
              style={{ transform: 'translateY(-80px)', animation: 'float-shirt 6.5s ease-in-out infinite' }}
            />
          </div>

          <div className="relative flex min-h-[220px] items-center justify-center overflow-visible sm:min-h-[300px] md:min-h-[360px] lg:min-h-[500px]">
            <img
              src="/home/circle-half.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-0 h-[101%] w-[102%] max-w-[none] object-cover object-right opacity-95"
              style={{ transform: 'scaleX(1.0)' }}
            />

            <div className="relative z-10 flex w-full max-w-[560px] flex-col items-start justify-center px-2 text-left lg:px-0 lg:pr-10">
              <h2 className="w-full bg-[linear-gradient(175deg,rgba(183,128,0,1)_0%,rgba(255,219,134,1)_45%,rgba(162,114,0,1)_65%,rgba(163,114,0,1)_79%,rgba(212,175,55,1)_92%)] bg-clip-text font-['Bietro_DEMO-Regular',Helvetica] text-[clamp(28px,4vw,62px)] font-normal leading-[0.9] tracking-[0] text-transparent [-webkit-text-fill-color:transparent]">
                GRAB YOUR TEES NOW!!
              </h2>

              <p className="mt-4 max-w-[460px] text-[0.9rem] leading-relaxed text-[#f3e7c9]/90 sm:text-[1rem] lg:text-[1.08rem]">
                The future is never built by wiping away what came before; it is a living palimpsest, layering fresh innovation directly over the blueprints of our history. Beneath every modern advancement lies the raw backbone of human effort—much like the skull and spine in our design, reminding us of the organic roots that anchor everything we create. In this world, nanobots act as microscopic problem-solvers, replacing the inorganic environment around us while keeping human spirit and touch completely intact. These micro-architects pull together, adapt to any situation, and build solutions in places standard hands just can’t reach.
                <br /><br />
                That dynamic is the exact heartbeat of our student-led community at CET. The nanobots are a mirror for us: individual students coming together to continuously assemble, solve, and rewrite the legacy of our campus day by day. We are the ones venturing into unexplored spaces to drive real change. It takes a sharp clarity—a true Drishti—to look past the surface and catch sight of these tiny engines of progress working like a momentary glitch in reality, revealing the precise mechanical craft that connects our past effort to our future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


<style>{`
  @keyframes float-shirt {
    0%, 100% { transform: translateY(-80px); }
    50% { transform: translateY(-100px); }
  }

  @keyframes float-base {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`}</style>
