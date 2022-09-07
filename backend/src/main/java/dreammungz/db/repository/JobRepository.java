package dreammungz.db.repository;

import dreammungz.db.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface JobRepository extends JpaRepository<Job, Long> {
}
