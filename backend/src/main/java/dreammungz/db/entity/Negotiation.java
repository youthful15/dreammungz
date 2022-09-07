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
@Table(name = "negotiation")
public class Negotiation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "negotiation_id")
    private Long id;

    @Column(name = "price")
    private Long price;

    @Column(name = "nego_time")
    private LocalDateTime negoTime;

    @Column(name = "choice")
    private String choice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_id")
    private Trade trade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Negotiation(Long id, Long price, LocalDateTime negoTime, String choice, Trade trade, Member member) {
        this.id = id;
        this.price = price;
        this.negoTime = negoTime;
        this.choice = choice;
        this.trade = trade;
        this.member = member;
    }
}
