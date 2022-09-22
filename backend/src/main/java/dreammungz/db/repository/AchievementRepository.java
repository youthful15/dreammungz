package dreammungz.db.repository;

import dreammungz.db.entity.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}
