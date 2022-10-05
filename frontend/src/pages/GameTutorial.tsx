import TutorialImage from "../components/tutorial/TutorialImage"

const GameTutorial = () => {
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500">
      <div className="h-full w-full p-4 grid grid-cols-2 gap-4 overflow-y-auto scrollbar-hide">
        <TutorialImage
          image={"login/login1.png"}
          text="1. 본인 지갑 내의 코인(MUNG)은 지갑 열어보기를 통해 확인해보세요"
        />
        <TutorialImage image="image" text="2. 메타마스크에 가입하세요" />
        <TutorialImage
          image="game/game3.png"
          text="3. 교배할 강아지가 없으면 아기 강아지 모드를 선택하세요"
        />
        <TutorialImage
          image="game/game4.png"
          text="4. 교배할 강아지가 있으면 부모를 조합하여 플레이해보세요"
        />
        <TutorialImage
          image="game/game5.png"
          text="5. 게임을 진행하려면 메타마스크 승인을 진행하세요"
        />
        <TutorialImage
          image="game/game6.png"
          text="6. 선택지를 선택하며 강아지의 능력치를 올려봐요"
        />
        <TutorialImage
          image="game/game7.png"
          text="7. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요"
        />
        <TutorialImage
          image="game/game8.png"
          text="8. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요"
        />
        <TutorialImage
          image="game/game9.png"
          text="9. 게임이 끝나면 NFT 민팅하기를 눌러 강아지를 획득하세요"
        />
      </div>
    </div>
  )
}

export default GameTutorial
