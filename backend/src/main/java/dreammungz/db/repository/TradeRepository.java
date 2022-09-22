package dreammungz.db.repository;

import dreammungz.db.entity.Nft;
import dreammungz.db.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface TradeRepository extends JpaRepository<Trade, Long> {
    Boolean existsByNft(Nft nft);

    List<Trade> findByNft(Nft nft);
}
