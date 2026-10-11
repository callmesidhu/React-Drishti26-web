import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
 {
  q: 'How do I obtain entry passes for the ProShow?',
  a: 'ProShow passes can be booked online via the official registration link or collected from the Drishti Registration Desk on campus. Passes are linked to your Drishti ID.',
 },
 {
  q: 'Can non-CETians attend the ProShow?',
  a: 'Yes! The ProShow is open to students from all colleges with a valid college ID card and an official Drishti ProShow pass.',
 },
 {
  q: 'What items are prohibited inside the concert venue?',
  a: 'Prohibited items include professional cameras, tripods, glass bottles, food items, sharp objects, laser pointers, alcohol and other intoxicating substances. Standard bags are subject to security search.',
 },
]

const getBackgroundCoverScale = (scene, background) => {
 const fitScale = scene.clientWidth / background.naturalWidth
 return Math.max(fitScale, scene.clientHeight / background.naturalHeight) / fitScale
}

function ProShowsPage({ embedded = false }) {
 const [openFaq, setOpenFaq] = useState(null)
 const shaanSceneRef = useRef(null)
 const shaanBackgroundRef = useRef(null)
 const shaanArtistsRef = useRef(null)
 const shaanGradientRef = useRef(null)
 const shaanTextRef = useRef(null)
 const sceneRef = useRef(null)
 const backgroundRef = useRef(null)
 const portraitsRef = useRef([])
 const artistNameRef = useRef(null)

 useEffect(() => {
  const scene = shaanSceneRef.current
  const background = shaanBackgroundRef.current
  const artists = shaanArtistsRef.current
  const gradient = shaanGradientRef.current
  const text = shaanTextRef.current
  if (!scene || !background || !artists || !gradient || !text) return

  const animation = gsap.matchMedia()
  animation.add('(prefers-reduced-motion: reduce)', () => {
   const setStaticState = () => {
    if (!background.naturalWidth || !background.naturalHeight) return
    gsap.set(background, { scale: 1 })
    gsap.set([artists, gradient, text], { autoAlpha: 1, y: 0 })
   }
   if (background.complete) {
    setStaticState()
   } else {
    background.addEventListener('load', setStaticState, { once: true })
   }
   return () => background.removeEventListener('load', setStaticState)
  })

  animation.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
   let trigger
   let timeline
   const setupAnimation = () => {
    if (!background.naturalWidth || !background.naturalHeight) return
    const coverScale = getBackgroundCoverScale(scene, background)

    gsap.set(background, { scale: 1 })
    gsap.set(artists, { autoAlpha: 0, y: '24svh' })
    gsap.set(gradient, { autoAlpha: 0, y: 20 })
    gsap.set(text, { autoAlpha: 0, y: 12 })

    timeline = gsap.timeline({ paused: true })
     .to(background, { scale: coverScale, duration: 1.1, ease: 'power2.inOut' })
     .to(artists, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2')
     .to(gradient, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3')
     .to(text, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.1')

    const playEntrance = () => timeline.play()
    trigger = ScrollTrigger.create({
     trigger: scene,
     start: 'top 70%',
     once: true,
     onEnter: playEntrance,
    })
    const bounds = scene.getBoundingClientRect()
    if (bounds.top <= window.innerHeight * 0.7 && bounds.bottom > 0) playEntrance()
   }
   if (background.complete) {
    setupAnimation()
   } else {
    background.addEventListener('load', setupAnimation, { once: true })
   }
   return () => {
    background.removeEventListener('load', setupAnimation)
    trigger?.kill()
    timeline?.kill()
    gsap.killTweensOf([background, artists, gradient, text])
   }
  })

  animation.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
   let timeline
   const setupAnimation = () => {
    if (!background.naturalWidth || !background.naturalHeight) return
    gsap.set(background, { scale: 1 })
    gsap.set(artists, { autoAlpha: 0, y: '24svh' })
    gsap.set(gradient, { autoAlpha: 0, y: 20 })
    gsap.set(text, { autoAlpha: 0, y: 12 })

    timeline = gsap.timeline({
     scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: () => `+=${window.innerHeight * 1.6}`,
      pin: scene,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
     },
    })
     .to(artists, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.2)
     .to(gradient, { autoAlpha: 1, y: 0, duration: 0.24, ease: 'power2.out' }, 0.56)
     .to(text, { autoAlpha: 1, y: 0, duration: 0.18, ease: 'power2.out' }, 0.76)
   }
   if (background.complete) {
    setupAnimation()
   } else {
    background.addEventListener('load', setupAnimation, { once: true })
   }
   return () => {
    background.removeEventListener('load', setupAnimation)
    timeline?.scrollTrigger?.kill()
    timeline?.kill()
    gsap.killTweensOf([background, artists, gradient, text])
   }
  })

  return () => animation.revert()
 }, [])

 useEffect(() => {
  const scene = sceneRef.current
  if (!scene) return
  const portraits = portraitsRef.current

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let handlePointerMove = null
  let resetParallax = null
  let desktopSequenceActive = false

  if (!prefersReducedMotion) {
   const moveX = portraits.map((portrait) =>
    portrait ? gsap.quickTo(portrait, 'x', { duration: 0.7, ease: 'power3.out' }) : null
   )
   const moveY = portraits.map((portrait) =>
    portrait ? gsap.quickTo(portrait, 'y', { duration: 0.7, ease: 'power3.out' }) : null
   )
   const depths = [1, -1.5, 2]

   handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || desktopSequenceActive) return
    const bounds = scene.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    depths.forEach((depth, index) => {
     moveX[index]?.(x * depth * 18)
     moveY[index]?.(y * depth * 12)
    })
   }
   resetParallax = () => {
    moveX.forEach((move) => move?.(0))
    moveY.forEach((move) => move?.(0))
   }

   scene.addEventListener('pointermove', handlePointerMove)
   scene.addEventListener('pointerleave', resetParallax)
  }

  const mobileAnimation = gsap.matchMedia()
  mobileAnimation.add('(max-width: 1023px) and (prefers-reduced-motion: reduce)', () => {
   const background = backgroundRef.current
   if (!background) return undefined

   const setStaticCover = () => {
    if (!background.naturalWidth || !background.naturalHeight) return
    gsap.set(background, { scale: getBackgroundCoverScale(scene, background) })
   }
   if (background.complete) {
    setStaticCover()
   } else {
    background.addEventListener('load', setStaticCover, { once: true })
   }

   return () => background.removeEventListener('load', setStaticCover)
  })
  mobileAnimation.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
   const background = backgroundRef.current
   const portrait = portraits[2]
   if (!background || !portrait) return undefined

   let trigger
   let timeline
   let hasPlayed = false
   const setupAnimation = () => {
    if (!background.naturalWidth || !background.naturalHeight) return

    const coverScale = getBackgroundCoverScale(scene, background)

    gsap.set(background, { scale: 1 })
    gsap.set(portrait, { autoAlpha: 0, y: 36, scale: 0.92 })
    timeline = gsap.timeline({ paused: true })
     .to(background, { scale: coverScale, duration: 1.4, ease: 'power2.inOut' })
     .to(portrait, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, '-=0.1')
    const playEntrance = () => {
     if (hasPlayed) return
     hasPlayed = true
     timeline.play()
    }

    trigger = ScrollTrigger.create({
     trigger: scene,
     start: 'top 70%',
     once: true,
     onEnter: playEntrance,
    })
    const bounds = scene.getBoundingClientRect()
    if (bounds.top <= window.innerHeight * 0.7 && bounds.bottom > 0) playEntrance()
   }
   const handleBackgroundError = () => {
    background.removeEventListener('load', setupAnimation)
   }

   if (background.complete) {
    setupAnimation()
   } else {
    background.addEventListener('load', setupAnimation, { once: true })
    background.addEventListener('error', handleBackgroundError, { once: true })
   }

   return () => {
    background.removeEventListener('load', setupAnimation)
    background.removeEventListener('error', handleBackgroundError)
    trigger?.kill()
    timeline?.kill()
    gsap.killTweensOf([background, portrait])
   }
  })

   const desktopAnimation = gsap.matchMedia()
   desktopAnimation.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const [leftPortrait, rightPortrait, frontPortrait] = portraits
    const artistName = artistNameRef.current
    if (!leftPortrait || !rightPortrait || !frontPortrait || !artistName) return undefined

    gsap.set(leftPortrait, { autoAlpha: 0, x: () => -scene.clientWidth * 0.75 })
    gsap.set(rightPortrait, { autoAlpha: 0, x: () => scene.clientWidth * 0.75 })
    gsap.set(frontPortrait, { autoAlpha: 0 })
    gsap.set(artistName, { autoAlpha: 0, y: 20 })

    const timeline = gsap.timeline({
     scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: () => `+=${window.innerHeight * 2.2}`,
      pin: scene,
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: ({ progress }) => {
       desktopSequenceActive = progress > 0 && progress < 1
      },
     },
    })
     .to([leftPortrait, rightPortrait], {
      autoAlpha: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out',
     }, 0.15)
     .to(frontPortrait, {
      autoAlpha: 1,
      duration: 0.24,
      ease: 'none',
     }, 0.62)
     .to(artistName, {
      autoAlpha: 1,
      y: 0,
      duration: 0.16,
      ease: 'power2.out',
     }, 0.72)

    return () => {
     desktopSequenceActive = false
     timeline.scrollTrigger?.kill()
     timeline.kill()
    }
   })

   return () => {
   mobileAnimation.revert()
   desktopAnimation.revert()
   if (handlePointerMove) {
    scene.removeEventListener('pointermove', handlePointerMove)
    scene.removeEventListener('pointerleave', resetParallax)
   }
   portraits.forEach((portrait) => portrait && gsap.killTweensOf(portrait))
  }
 }, [])

 return (
  <div className={`relative min-h-svh w-full text-white ${embedded ? 'bg-transparent' : 'bg-[#050505]'}`}>
   {!embedded && <Backdrop />}
   {!embedded && <Navbar activeSection="proshows" />}

   <section
    ref={shaanSceneRef}
    className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
   >
    <img
     ref={shaanBackgroundRef}
     src="/proshow/bg1.png"
     alt=""
     aria-hidden="true"
     className="absolute left-1/2 top-1/2 h-auto w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-contain lg:top-[clamp(72px,8.33vw,128px)] lg:translate-y-0"
    />
    <div className="pointer-events-none absolute inset-0 bg-black/10" />
    <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[22%] bg-black lg:hidden"
    />
    <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-[16%] bg-black lg:block"
    />
    <h1 className="absolute inset-x-0 top-[calc(4.75rem+1rem)] z-40 text-center font-['Bietro_DEMO-Regular'] text-3xl uppercase tracking-wide text-gold-gradient lg:top-[8%] lg:text-5xl">
     PRO SHOWS
    </h1>
    <img
     ref={shaanArtistsRef}
     src="/proshow/artists.png"
     alt=""
     aria-hidden="true"
     className="absolute bottom-[8%] left-1/2 z-10 h-auto w-[122vw] max-w-none -translate-x-1/2 object-contain object-bottom lg:bottom-0 lg:w-[33.3333vw]"
    />
    <img
     ref={shaanGradientRef}
     src="/proshow/gradient.png"
     alt=""
     aria-hidden="true"
     className="absolute bottom-[5%] left-1/2 z-20 h-auto w-[220vw] max-w-none -translate-x-1/2 object-contain lg:-bottom-[5%] lg:w-[117vw]"
    />
    <img
     ref={shaanTextRef}
     src="/proshow/shaan.png"
     alt="Shaan Rahman live in concert"
     className="absolute bottom-[10%] left-[calc(50%+11vw)] z-30 h-auto w-[92vw] max-w-none -translate-x-1/2 object-contain lg:bottom-[13%] lg:left-[55%] lg:w-[40vw]"
    />
    <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-x-0 bottom-0 z-25 h-[12%] bg-black lg:hidden"
    />
   </section>

   <main
    ref={sceneRef}
    className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-black"
   >
    <img
     ref={backgroundRef}
     src="/proshow/bg.png"
     alt=""
     aria-hidden="true"
     className="absolute left-1/2 top-1/2 h-auto w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-contain lg:inset-0 lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0 lg:object-cover lg:object-[center_25%]"
    />
    <div className="pointer-events-none absolute inset-0 bg-black/10" />
    <div className="pointer-events-none absolute inset-x-0 top-[14%] bottom-[16%] translate-y-[6svh] overflow-hidden lg:inset-0 lg:translate-y-[clamp(48px,8svh,80px)]">
     <img
      ref={(element) => { portraitsRef.current[0] = element }}
      src="/proshow/dhvani3.png"
      alt=""
      aria-hidden="true"
      className="absolute bottom-0 left-[20%] z-10 hidden h-[75%] w-auto max-w-none object-contain object-bottom lg:block lg:motion-safe:opacity-0"
     />
     <img
      ref={(element) => { portraitsRef.current[1] = element }}
      src="/proshow/dhvani2.png"
      alt=""
      aria-hidden="true"
      className="absolute bottom-0 left-[52%] z-10 hidden h-[75%] w-auto max-w-none object-contain object-bottom lg:block lg:motion-safe:opacity-0"
     />
     <img
      ref={(element) => { portraitsRef.current[2] = element }}
      src="/proshow/dhvani1.png"
      alt="Dhvani performing live"
      fetchPriority="high"
      className="absolute bottom-0 left-1/2 z-20 h-auto w-[160vw] max-w-none -translate-x-[65%] object-contain object-bottom sm:w-[130vw] lg:left-[calc(50%-50.5svh)] lg:h-[93svh] lg:w-auto lg:translate-x-0 lg:motion-safe:opacity-0"
     />
    </div>
    <div
     aria-hidden="true"
     className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[16%] bg-black lg:h-[12%]"
    />
    <p
     ref={artistNameRef}
     className="absolute inset-x-0 bottom-[10%] z-40 text-center font-['Bietro_DEMO-Regular'] text-xl tracking-wide text-gold-gradient lg:bottom-[4%] lg:text-3xl lg:motion-safe:opacity-0"
    >
     Dhvani Bhanushali
    </p>
   </main>

   {/* FAQ Section */}
    <section className="mx-auto max-w-[900px] lg:max-w-[1200px] px-[clamp(16px,4vw,40px)] py-20">
    <h2
     style={{ fontFamily: "'Bietro DEMO-Regular', 'Bietro DEMO', sans-serif" }}
     className="text-center text-3xl font-bold uppercase tracking-tight text-gold-gradient"
    >
     ProShow Guidelines & FAQ
    </h2>
    <div className="mt-10 grid grid-cols-1 items-start gap-4">
     {faqs.map((faq, i) => {
      const isOpen = openFaq === i;
      return (
       <div
        key={i}
        className={`overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-400 ease-out ${isOpen
         ? 'border-[#D4AF37]/60 bg-black/75 '
         : 'border-gold/20 bg-black/40 hover:border-gold/40 hover:bg-black/55'
         }`}
       >
        <button
         type="button"
         onClick={() => setOpenFaq(isOpen ? null : i)}
         className="flex w-full items-center justify-between p-5 md:p-6 text-left cursor-pointer transition-colors duration-300 select-none"
         aria-expanded={isOpen}
        >
         <span
          style={{ fontFamily: "'Clash Display', sans-serif" }}
          className={`text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${isOpen ? 'text-[#D4AF37]' : 'text-white'
           }`}
         >
          {faq.q}
         </span>
         <span
          className={`ml-4 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
           ? 'rotate-45 border-[#D4AF37] bg-gold/20 text-[#D4AF37] '
           : 'rotate-0 border-gold/30 bg-black/30 text-gold-gradient hover:border-gold/60'
           }`}
         >
          <svg
           xmlns="http://www.w3.org/2000/svg"
           width="14"
           height="14"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           strokeWidth="2.5"
           strokeLinecap="round"
           strokeLinejoin="round"
          >
           <line x1="12" y1="5" x2="12" y2="19"></line>
           <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
         </span>
        </button>
        <div
         className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
         <div className="overflow-hidden">
          <div className="border-t border-gold/10 px-5 pb-5 pt-3 md:px-6 md:pb-6 md:pt-3 text-xs md:text-sm leading-relaxed text-white/70">
           {faq.a}
          </div>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </section>
  </div>
 )
}

export default ProShowsPage
