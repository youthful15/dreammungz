package dreammungz.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import dreammungz.db.entity.Member;
import dreammungz.db.entity.Nft;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static dreammungz.db.entity.QNft.nft;

@Repository
public class NftRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public NftRepositorySupport(JPAQueryFactory queryFactory) {
        super(Nft.class);
        this.queryFactory = queryFactory;
    }
    public Page<Nft> findAll(Pageable pageable){
        List<Nft> nfts =  queryFactory
                .select(nft)
                .from(nft)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = queryFactory
                .select(nft.count())
                .from(nft)
                .fetchOne();
        return new PageImpl<>(nfts, pageable, count);
    }

    public List<Nft> findAllByMember(Member member){
        return queryFactory
                .select(nft)
                .from(nft)
                .where(nft.member.eq(member))
                .fetch();

    }
}
