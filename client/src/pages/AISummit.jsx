import Navbar from '../components/Navbar.jsx'
import Backdrop from '../components/Backdrop.jsx'
import Footer from '../components/Footer.jsx'

function AISummit() {
 return (
    <>
    <div className="relative min-h-svh w-full overflow-x-hidden bg-[#050505] text-white">
   <Backdrop />
   <Navbar activeSection="ai summit" />

     <main className="relative min-h-svh w-full">
        <div className="relative h-svh w-full overflow-hidden">
         <video
            className="absolute left-1/2 top-1/2 h-[100vw] w-[100vh] max-w-none object-cover"
            src="/techevents/ai-summit.webm"
            autoPlay
            muted
            loop
            playsInline
            style={{ transform: 'translate(-50%, -50%) rotate(-90deg)' }}
         >
            Your browser does not support the video tag.
         </video>
        </div>
   </main>
  </div>
    <Footer />
    </>
 )
}

export default AISummit
