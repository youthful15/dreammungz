package dreammungz.db.repository;

import dreammungz.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByAddress(String address);

    Optional<Member> findByNickname(String nickname);
}
