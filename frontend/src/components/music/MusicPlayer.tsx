import { useRecoilState, useRecoilValue } from "recoil"
import { useRef, useState, useEffect } from "react"
import playingMusic from "../../recoil/music/atom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons"

export default function MusicPlayer() {
  const musicName = useRecoilValue(playingMusic)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  return (
    <button
      className="absolute right-10 top-10 round-full bg-beige-200 h-[60px] w-[60px] rounded-full p-3"
      onClick={() => {
        setIsPlaying(!isPlaying)
      }}
    >
      <audio
        src={`audios/${musicName}.mp3`}
        autoPlay
        id="audio"
        ref={audioRef}
        loop
      ></audio>
      {isPlaying ? (
        <FontAwesomeIcon
          icon={faVolumeUp}
          className="w-full h-full text-[#ff8d8d]"
        />
      ) : (
        <FontAwesomeIcon
          icon={faVolumeXmark}
          className="w-full h-full text-pink-500"
        />
      )}
    </button>
  )
}
