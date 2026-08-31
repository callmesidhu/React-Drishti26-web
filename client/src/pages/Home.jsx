import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProShows from "./ProShows";
import EventDetailsModal from "../components/EventDetailsModal";
import { dakshaEventsData, competitionsData, workshopsData } from "../data/eventsData";

import Hero from "../components/landing/Hero";
import Ideas from "../components/landing/Ideas";
import Aftermovie from "../components/landing/Aftermovie";
import GallerySection from "../components/landing/GallerySection";
import DrishTees from "../components/landing/DrishTees";
import FeaturedEvents from "../components/landing/FeaturedEvents";

const featuredEvents = [
  dakshaEventsData[0],
  competitionsData[0],
  competitionsData[1],
  workshopsData[0],
];

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
      <Ideas />
      <Aftermovie />
      
      {/* ============ PRO SHOWS ============ */}
      <section id="proshows" className="relative w-full bg-black overflow-hidden">
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