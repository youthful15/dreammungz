package dreammungz.db.repository;

import dreammungz.db.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface StatusRepository extends JpaRepository<Status, Long> {
}
