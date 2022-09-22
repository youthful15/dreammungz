package dreammungz.db.repository;

import dreammungz.db.entity.Negotiation;
import dreammungz.db.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/*
@author 황승주
@since 2022. 09. 07.
*/

public interface NegotiationRepository extends JpaRepository<Negotiation, Long> {
    List<Negotiation> findAllByTradeId(Long tradeId);
    Optional<Negotiation> findByContractId(Long contractId);

}
