import { Suspense, useEffect, useRef, useState } from "react";

export default function DeferredSection({ children, minHeight = "100svh" }) {
 const ref = useRef(null);
 const [shouldRender, setShouldRender] = useState(false);

 useEffect(() => {
  const element = ref.current;
  if (!element) return undefined;

  const observer = new IntersectionObserver(
   ([entry]) => {
    if (!entry.isIntersecting) return;
    setShouldRender(true);
    observer.disconnect();
   },
   { rootMargin: "800px 0px" },
  );

  observer.observe(element);
  return () => observer.disconnect();
 }, []);

 return (
  <div ref={ref} style={!shouldRender ? { minHeight } : undefined}>
   {shouldRender && <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>}
  </div>
 );
}
