package dreammungz.db.repository;

import dreammungz.db.entity.Negotiation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface NegotiationRepository extends JpaRepository<Negotiation, Long> {
    List<Negotiation> findAllByTradeId(Long tradeId);
}
