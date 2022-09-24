package dreammungz.db.repository;

import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import dreammungz.db.entity.Trade;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static dreammungz.db.entity.QTrade.trade;
import static dreammungz.enums.State.COMPLETE;

/*
@author 신슬기
@since 2022. 09. 24.
*/

@Repository
public class TradeRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public TradeRepositorySupport(JPAQueryFactory queryFactory) {
        super(Trade.class);
        this.queryFactory = queryFactory;
    }

    public Page<Trade> findHistoryByAddress(Pageable pageable, String address) {
        JPQLQuery<Trade> query = queryFactory
                .select(trade)
                .where(trade.state.eq(COMPLETE),
                        (trade.seller.member.address.eq(address).or(trade.buyer.member.address.eq(address))))
                .from(trade);
        List<Trade> trades = this.getQuerydsl().applyPagination(pageable, query).orderBy(trade.endTime.desc()).fetch();
        return new PageImpl<>(trades, pageable, query.fetchCount());
    }

}
