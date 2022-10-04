import TutorialImage from "../components/tutorial/TutorialImage"

const GameTutorial = () => {
  return (
    <div className="w-full h-full  rounded-lg shadow-md bg-beige-400 mapleStory text-brown-500">
      <div className="h-full w-full p-4 grid grid-cols-2 gap-4 overflow-y-auto scrollbar-hide">
        <TutorialImage image="image" text="text" />
        <TutorialImage image="image" text="text" />
        <TutorialImage image="image" text="text" />
        <TutorialImage image="image" text="text" />
        <TutorialImage image="image" text="text" />
        <TutorialImage image="image" text="text" />
      </div>
    </div>
  )
}

export default GameTutorial
