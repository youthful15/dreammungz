package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

/*
@author 황승주
@since 2022. 09. 07.
*/

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Table(name = "trade")
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private Long id;

    @Column(name = "state")
    private String state;

    @Column(name = "nego_able")
    private String negoAble;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "start_price")
    private Long startPrice;

    @Column(name = "end_price")
    private Long endPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft_id")
    private Nft nft;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;

    @Builder
    public Trade(Long id, String state, String negoAble, LocalDateTime startTime, LocalDateTime endTime, Long startPrice, Long endPrice, Nft nft, Seller seller) {
        this.id = id;
        this.state = state;
        this.negoAble = negoAble;
        this.startTime = startTime;
        this.endTime = endTime;
        this.startPrice = startPrice;
        this.endPrice = endPrice;
        this.nft = nft;
        this.seller = seller;
    }

    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }
}
