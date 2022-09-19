package dreammungz.db.repository;

import dreammungz.db.entity.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface GameStatusRepository extends JpaRepository<GameStatus, Long> {
        List<GameStatus> findAllByGameId(Long gameId);
}
