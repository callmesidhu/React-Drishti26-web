import { Component, Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const EMBLEM_MODEL_PATH = "/home/drishti.glb";
const TARGET_SIZE = 2.5;

class ModelErrorBoundary extends Component {
 constructor(props) {
 super(props);
 this.state = { hasError: false };
 }

 static getDerivedStateFromError() {
 return { hasError: true };
 }

 componentDidCatch(error) {
 console.error("[IdeasEmblem3D] failed to load emblem model:", error);
 }

 render() {
 if (this.state.hasError) return null;
 return this.props.children;
 }
}

function EmblemModel({ onReady }) {
 const { scene } = useGLTF(EMBLEM_MODEL_PATH);
 const outerGroupRef = useRef(null);

 const { normalizedScale, centerOffset } = useMemo(() => {
 const box = new THREE.Box3().setFromObject(scene);
 const size = new THREE.Vector3();
 box.getSize(size);
 const center = new THREE.Vector3();
 box.getCenter(center);
 const largestDimension = Math.max(size.x, size.y, size.z) || 1;
 return {
 normalizedScale: TARGET_SIZE / largestDimension,
 centerOffset: center.multiplyScalar(-1),
 };
 }, [scene]);

 useEffect(() => {
 scene.traverse((child) => {
 if (child.isMesh && child.material) {
 child.material.side = THREE.DoubleSide;
 child.material.needsUpdate = true;
 }
 });
 }, [scene]);

 useEffect(() => {
 if (outerGroupRef.current && onReady) {
 onReady(outerGroupRef.current);
 }
 }, [onReady]);

 return (
 <group ref={outerGroupRef}>
 <group scale={normalizedScale} position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
 <primitive object={scene} />
 </group>
 </group>
 );
}

function IdeasEmblem3D({ className = "", onModelReady }) {
 return (
 <div className={`relative ${className}`} style={{ minWidth: "100%", minHeight: "100%" }}>
 <Canvas 
 camera={{ position: [0, 0, 5], fov: 45 }}
 style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
 >
 <ambientLight intensity={1.2} color="#ffffff" />
 <directionalLight position={[3, 4, 5]} intensity={2.0} color="#ffd88a" />
 <directionalLight position={[-3, -2, -2]} intensity={1.0} color="#8a6a1f" />
 <ModelErrorBoundary>
 <Suspense fallback={null}>
 <EmblemModel onReady={onModelReady} />
 </Suspense>
 </ModelErrorBoundary>
 </Canvas>
 </div>
 );
}

useGLTF.preload(EMBLEM_MODEL_PATH);

export default IdeasEmblem3D;