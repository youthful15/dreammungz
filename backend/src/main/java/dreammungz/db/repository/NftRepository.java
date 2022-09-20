package dreammungz.db.repository;

import dreammungz.db.entity.Nft;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface NftRepository extends JpaRepository<Nft, Long> {

    /*
    @author 신슬기
    @since 2022. 09. 16.
    */
    Optional<Nft> findNftByTokenId(Long tokenId);


}
