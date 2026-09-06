import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProShows from "./ProShows";
import EventDetailsModal from "../components/EventDetailsModal";
import { featuredEvents } from "../data/featuredCompetitions";

import Hero from "../components/landing/Hero";
import Countdown from "../components/landing/Countdown";
import Ideas from "../components/landing/Ideas";
import Aftermovie from "../components/landing/Aftermovie";
import GallerySection from "../components/landing/GallerySection";
import DrishTees from "../components/landing/DrishTees";
import FeaturedEvents from "../components/landing/FeaturedEvents";


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
 <Ideas />
 <Aftermovie />
 
 {/* Fade gradient that bleeds upwards to blend the sharp edge of ProShows without adding scroll height */}
 <div className="relative z-30 w-full h-0">
 <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />
 </div>

 {/* ============ PRO SHOWS ============ */}
 <section id="proshows" className="relative w-full bg-black overflow-hidden z-20">
 <ProShows embedded={true} />
 </section>

 <GallerySection />
 <DrishTees />
 <FeaturedEvents onEventClick={handleRegistration} />

 <Footer />

 {activeModalEvent && (
 <EventDetailsModal
 event={activeModalEvent}
 onClose={() => setActiveModalEvent(null)}
 />
 )}
 </main>
 );
}

export default Home;
