package dreammungz.db.entity;

import dreammungz.enums.Check;
import dreammungz.enums.State;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private State state;

    @Enumerated(EnumType.STRING)
    @Column(name = "nego_able", nullable = false)
    private Check negoAble;

    @Column(name = "start_time", nullable = false, updatable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "start_price", nullable = false)
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
    public Trade(Long id, String state, String negoAble, LocalDateTime startTime, LocalDateTime endTime, Long startPrice, Nft nft, Seller seller) {
        this.id = id;
        this.state = State.valueOf(state);
        this.negoAble = Check.valueOf(negoAble);
        this.startTime = startTime;
        this.endTime = endTime;
        this.startPrice = startPrice;
        this.nft = nft;
        this.seller = seller;
    }

    public void setState(String state) { this.state = State.valueOf(state);}
    public void setBuyer(Buyer buyer) {
        this.buyer = buyer;
    }
    public void setEndPrice(Long endPrice) { this.endPrice = endPrice; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
}
