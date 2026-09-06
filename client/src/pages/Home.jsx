import { lazy, Suspense, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DeferredSection from "../components/DeferredSection";
import { featuredEvents } from "../data/featuredCompetitions";

import Hero from "../components/landing/Hero";
import Countdown from "../components/landing/Countdown";
const Ideas = lazy(() => import("../components/landing/Ideas"));
const Aftermovie = lazy(() => import("../components/landing/Aftermovie"));
const ProShows = lazy(() => import("./ProShows"));
const GallerySection = lazy(() => import("../components/landing/GallerySection"));
const DrishTees = lazy(() => import("../components/landing/DrishTees"));
const FeaturedEvents = lazy(() => import("../components/landing/FeaturedEvents"));
const EventDetailsModal = lazy(() => import("../components/EventDetailsModal"));


function Home() {
 const [activeModalEvent, setActiveModalEvent] = useState(null);

 const handleRegistration = (eventIndex) => {
 setActiveModalEvent(featuredEvents[eventIndex]);
 window.dispatchEvent(
 new CustomEvent("featured-event-registration", { detail: { eventIndex } })
 );
 };

 return (
 <main className="relative w-full overflow-x-hidden bg-black">
 <Navbar />
 
 <Hero />
 <Countdown />
 <DeferredSection minHeight="100svh"><Ideas /></DeferredSection>
 <DeferredSection minHeight="100svh"><Aftermovie /></DeferredSection>
 
 {/* Fade gradient that bleeds upwards to blend the sharp edge of ProShows without adding scroll height */}
 <div className="relative z-30 w-full h-0">
 <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
 </div>

 {/* ============ PRO SHOWS ============ */}
 <DeferredSection minHeight="100svh"><section id="proshows" className="relative w-full bg-black overflow-hidden z-20"><ProShows embedded={true} /></section></DeferredSection>

 <DeferredSection minHeight="80svh"><GallerySection /></DeferredSection>
 <DeferredSection minHeight="100svh"><DrishTees /></DeferredSection>
 <DeferredSection minHeight="100svh"><FeaturedEvents onEventClick={handleRegistration} /></DeferredSection>

 <Footer />

 {activeModalEvent && (
 <Suspense fallback={null}>
  <EventDetailsModal
  event={activeModalEvent}
  onClose={() => setActiveModalEvent(null)}
  />
 </Suspense>
 )}
 </main>
 );
}

export default Home;
