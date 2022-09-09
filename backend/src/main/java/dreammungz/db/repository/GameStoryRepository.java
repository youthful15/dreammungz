package dreammungz.db.repository;

import dreammungz.db.entity.GameStory;
import org.springframework.data.jpa.repository.JpaRepository;

/*
@author 황승주
@since 2022. 09. 10.
*/

public interface GameStoryRepository extends JpaRepository<GameStory, Long> {
}
