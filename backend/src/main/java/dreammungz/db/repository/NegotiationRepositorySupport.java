package dreammungz.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import dreammungz.db.entity.Negotiation;
import dreammungz.enums.Check;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static dreammungz.db.entity.QNegotiation.negotiation;
import static dreammungz.db.entity.QTrade.trade;

/*
@author 신슬기
@since 2022. 09. 26
*/

@Repository
public class NegotiationRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public NegotiationRepositorySupport(JPAQueryFactory queryFactory) {
        super(Negotiation.class);
        this.queryFactory = queryFactory;
    }

    public List<Negotiation> findByTradeId(Long tradeId){
        return queryFactory
                .select(negotiation)
                .where(negotiation.trade.id.eq(tradeId),negotiation.cancel.eq(Check.N),negotiation.choice.eq(Check.N))
                .from(negotiation)
                .orderBy(trade.endTime.desc())
                .fetch();
    }

}
