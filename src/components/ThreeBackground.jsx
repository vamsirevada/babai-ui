import { Canvas } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'

// Construction-themed floating elements
function ConstructionElements() {
  const group = useRef()
  const element1 = useRef()
  const element2 = useRef()
  const element3 = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.1) * 0.1
    }

    // Individual element animations with construction-like movements
    if (element1.current) {
      element1.current.position.y = Math.sin(time * 0.5) * 0.5
      element1.current.rotation.x = time * 0.2
    }

    if (element2.current) {
      element2.current.position.x = Math.cos(time * 0.3) * 1
      element2.current.rotation.z = time * 0.15
    }

    if (element3.current) {
      element3.current.position.y = Math.cos(time * 0.4) * 0.3
      element3.current.rotation.y = time * 0.25
    }
  })

  return (
    <group ref={group}>
      {/* Central building-like structure - subtle blue */}
      <mesh ref={element1} position={[0, 0, -3]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </mesh>

      {/* Crane-like structure - orange/construction yellow */}
      <mesh ref={element2} position={[4, 1, -2]}>
        <cylinderGeometry args={[0.1, 0.1, 4]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.2} />
      </mesh>

      {/* Foundation blocks - concrete gray */}
      <mesh position={[-3, -1, -2]}>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshBasicMaterial color="#6b7280" transparent opacity={0.1} />
      </mesh>

      {/* Construction site spheres - representing materials */}
      <mesh ref={element3} position={[2, 2, -1]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
      </mesh>

      {/* Steel beam representation */}
      <mesh position={[-2, 2, -2.5]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.15} />
      </mesh>

      {/* Floating construction particles */}
      <mesh position={[1, -1, -1]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} />
      </mesh>

      <mesh position={[-1, 3, -2]}>
        <sphereGeometry args={[0.4, 12, 12]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// Enhanced background component with construction theme
const ThreeBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 85,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={0.3} />
          <ConstructionElements />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeBackground
