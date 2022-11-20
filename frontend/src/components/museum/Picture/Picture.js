import React from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { draco, useGLTF } from "@react-three/drei"

const Picture = ({ url, scale, position, rotation, metalness, roughness }) => {
  const { scene } = useGLTF(
    url,
    "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
  )
  scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      child.material.toneMapped = false
      child.material.metalness = metalness
      child.material.roughness = roughness
    }
  })

  return (
    <primitive
      scale={scale}
      position={position}
      rotation={rotation}
      object={scene}
      dispose={null}
    />
  )
}

export default Picture
