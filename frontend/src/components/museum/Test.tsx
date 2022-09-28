import * as THREE from "three"
import { Suspense, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import Lights from "./Lights/Lights"
import { Physics } from "@react-three/cannon"
import Ground from "./Ground/Ground"
import Building from "./Building/Building"
import Art from "./Art/Art"
import Player from "./Player/Player"
import Camera from "./Camera/Camera"

function Box(props: JSX.IntrinsicElements["mesh"]) {
  // This reference will give us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state, delta) => (ref.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}

const Test = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Camera fov={60} />

        <fog attach="fog" args={["#272730", 30, 250]} />
        <Lights night={true} performance={performance} />

        <Physics gravity={[0, -30, 0]}>
          <Suspense fallback={null}>
            {/* <Ground /> */}
            <Building />
            {/* <Art /> */}
          </Suspense>
          <Player />
        </Physics>
      </Canvas>
    </div>
  )
}

export default Test
