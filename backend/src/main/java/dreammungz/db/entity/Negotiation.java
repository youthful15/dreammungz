package dreammungz.db.entity;

import dreammungz.enums.Check;
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
@Table(name = "negotiation")
@EntityListeners(AuditingEntityListener.class)
public class Negotiation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "negotiation_id")
    private Long id;

    @Column(name = "price", nullable = false)
    private Long price;

    @CreatedDate
    @Column(name = "nego_time", nullable = false, updatable = false)
    private LocalDateTime negoTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "choice", nullable = false)
    private Check choice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id", nullable = false)
    private Trade trade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name = "cancel", nullable = false)
    private Check cancel;

    @Column(name = "contract_id", nullable = false)
    private Long contractId;

    @Builder
    public Negotiation(Long price, LocalDateTime negoTime, Trade trade, Member member, Long contractId) {
        this.price = price;
        this.negoTime = negoTime;
        this.trade = trade;
        this.member = member;
        this.contractId = contractId;
    }

    public void setCancel(Check cancel) {
        this.cancel = cancel;
    }
}
