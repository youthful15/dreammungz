import findKOR from "../../utils/findKOR"

export interface AchievementListItemType {
  name: string
  isUnlock: boolean
  highestTier: string
}

const AchievementListItem = ({ item }: { item: AchievementListItemType }) => {
  const { name, isUnlock, highestTier } = item

  return (
    <li>
      {isUnlock ? (
        <div className="word-toggle">
          <a href="#">
            <div className="tier-cover">
              <div className={`tier gradient-border ${highestTier}`}>
                <img src={`/assets/bg/${name}.png`} />
              </div>
            </div>
          </a>
          <div className="image_title">
            <a href="#">{findKOR(name)}</a>
          </div>
        </div>
      ) : (
        <div>
          <a href="#">
            <div className="tier-cover">
              <div className={`tier gradient-border LOCK`}>
                <img className="LOCK_IMG" src={`/LOCK.png`} />
              </div>
            </div>
          </a>
        </div>
      )}
    </li>
  )
}

export default AchievementListItem
