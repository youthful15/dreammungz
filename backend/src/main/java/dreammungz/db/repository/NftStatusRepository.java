package dreammungz.db.repository;

import dreammungz.db.entity.Member;
import dreammungz.db.entity.NftStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface NftStatusRepository extends JpaRepository<NftStatus, Long> {
    List<NftStatus> findAllById(Long id);

}
