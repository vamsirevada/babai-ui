import { Canvas } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'

// Minimal construction intelligence elements
function MinimalElements() {
  const group = useRef()
  const building1 = useRef()
  const building2 = useRef()
  const dataFlow = useRef()
  const aiCore = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Very subtle group rotation for depth
    if (group.current) {
      group.current.rotation.y = Math.sin(time * 0.05) * 0.02
    }

    // Gentle building sway (construction stability visualization)
    if (building1.current) {
      building1.current.position.y = Math.sin(time * 0.3) * 0.1
      building1.current.rotation.y = Math.sin(time * 0.2) * 0.02
    }

    if (building2.current) {
      building2.current.position.y = Math.cos(time * 0.25) * 0.08
      building2.current.rotation.y = Math.cos(time * 0.15) * 0.015
    }

    // Subtle data flow animation (AI processing)
    if (dataFlow.current) {
      dataFlow.current.position.x = Math.sin(time * 0.4) * 0.3
      dataFlow.current.material.opacity = 0.05 + Math.sin(time * 0.6) * 0.02
    }

    // AI core gentle pulsing
    if (aiCore.current) {
      const scale = 1 + Math.sin(time * 0.8) * 0.05
      aiCore.current.scale.set(scale, scale, scale)
      aiCore.current.material.opacity = 0.03 + Math.sin(time * 0.5) * 0.01
    }
  })

  return (
    <group ref={group}>
      {/* Main building structure - representing construction projects */}
      <mesh ref={building1} position={[-2, 0, -4]}>
        <boxGeometry args={[0.8, 2.5, 0.8]} />
        <meshBasicMaterial color="#1561ad" transparent opacity={0.04} />{' '}
        {/* Primary Blue */}
      </mesh>

      {/* Secondary building - project portfolio */}
      <mesh ref={building2} position={[2.5, 0, -3.5]}>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.035} />{' '}
        {/* Accent Gold */}
      </mesh>

      {/* Data connection lines - WhatsApp/AI communication */}
      <mesh ref={dataFlow} position={[0, 1, -2.5]}>
        <cylinderGeometry args={[0.02, 0.02, 3]} />
        <meshBasicMaterial color="#212121" transparent opacity={0.06} />{' '}
        {/* Charcoal */}
      </mesh>

      {/* AI intelligence core - subtle central element */}
      <mesh ref={aiCore} position={[0, 0, -3]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color="#1561ad" transparent opacity={0.04} />{' '}
        {/* Primary Blue */}
      </mesh>

      {/* Foundation elements - stability and trust */}
      <mesh position={[-1, -1.2, -3]}>
        <boxGeometry args={[3, 0.2, 3]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.02} />{' '}
        {/* White */}
      </mesh>

      {/* Minimal floating data points */}
      <mesh position={[1.5, 1.5, -2]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial color="#FFB300" transparent opacity={0.08} />{' '}
        {/* Accent Gold */}
      </mesh>

      <mesh position={[-1.8, 1.2, -2.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#1561ad" transparent opacity={0.06} />{' '}
        {/* Primary Blue */}
      </mesh>

      <mesh position={[0.5, -0.5, -1.8]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#212121" transparent opacity={0.05} />{' '}
        {/* Charcoal */}
      </mesh>
    </group>
  )
}

// Clean, minimal background for construction intelligence platform
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
          position: [0, 0, 5],
          fov: 75,
        }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.1} />
          <MinimalElements />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ThreeBackground
