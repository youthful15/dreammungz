import React from "react"
import Picture from "../Picture/Picture"
import Display from "../Display/Display"
import Image from "../NftImage/Image"

const img = [
  "https://ipfs.io/ipfs/QmUQ2aFFDnpp2iVon4f98Moq3R3GGyrfjko4ja5CQE32RT",
  "https://ipfs.io/ipfs/QmamFg26kreM3dEAp8Wx64nWZPmH97PMQZ1x6xbitdzpfh",
  "https://ipfs.io/ipfs/QmQus4sx15VDkNtDuApqdgdd8rgpCb6W4eWrr2goFTey1N",
  "https://ipfs.io/ipfs/QmQ9uUWNiMSPMmeduk7wsGRa8bMQKVQErQfaV2Ufnem39p",
  "https://ipfs.io/ipfs/QmZGHkH4zbL1JwnaVo9PWFgUUfYggisUeCLVGzwJ6jEbAf",
  "https://ipfs.io/ipfs/QmV71JPF9bbjpCVNSeNJLQRz2TjPLdhVMXtBVYRgpePRjy",
]

const Art = () => {
  return (
    <>
      {/* liam portrait */}
      <Display position={[20, 5, 0]} size={[1, 18, 11]} />
      <Display position={[20, 5, 25]} size={[1, 18, 11]} />
      <Display position={[-20, 5, 0]} size={[1, 18, 11]} />
      <Display position={[-20, 5, 25]} size={[1, 18, 11]} />

      {/* nft 이미지 */}
      <Image position={[19.3, 7, 0]} size={[0.1, 5, 5]} url={img[0]} />
      <Image position={[34.7, 12, 12]} size={[0.1, 5, 5]} url={img[1]} />
      <Image position={[19.3, 7, 25]} size={[0.1, 5, 5]} url={img[2]} />
      <Image position={[-19.3, 7, 0]} size={[0.1, 5, 5]} url={img[3]} />
      <Image position={[-19.4, 7, 25]} size={[0.1, 5, 5]} url={img[4]} />
      <Image position={[-34.6, 10, 12]} size={[0.1, 5, 5]} url={img[5]} />

      <Picture
        url={"assets/3D/Portrait/scene.gltf"}
        scale={[4, 4, 4]}
        position={[19.3, 7, 0]}
        rotation={[0, -Math.PI, 0]}
        metalness={0.9}
        roughness={0.9}
      />

      {/* creation of adam */}
      <Picture
        url={"assets/3D/Hands/scene.gltf"}
        scale={[0.1, 0.1, 0.1]}
        position={[34.7, 12, 12]}
        rotation={[0, -Math.PI / 2, Math.PI]}
        metalness={0}
        roughness={0.9}
      />

      {/* wedding */}
      <Picture
        url={"assets/3D/Wedding/scene.gltf"}
        scale={[2.5, 2.5, 2.5]}
        position={[19.3, 7, 25]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        metalness={0.0}
        roughness={0.3}
      />

      {/* wilson portrait */}
      <Picture
        url={"assets/3D/Wilson/scene.gltf"}
        scale={[2.5, 2.5, 2.5]}
        position={[-19.3, 7, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        metalness={0}
        roughness={0.3}
      />

      {/* old man portrait */}
      <Picture
        url={"assets/3D/OldMan/scene.gltf"}
        scale={[4, 3, 4]}
        position={[-19.4, 7, 25]}
        rotation={[0, 0, 0]}
        metalness={0.9}
        roughness={0.9}
      />

      {/* girl portrait */}
      <Picture
        url={"assets/3D/Girl/scene.gltf"}
        scale={[6.5, 6.5, 6.5]}
        position={[-34.6, 10, 12]}
        rotation={[-Math.PI / 2, 0, 0]}
        metalness={0.7}
        roughness={0.8}
      />
    </>
  )
}

export default Art
