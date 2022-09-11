package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/*
@author 황승주
@since 2022. 09. 07.
*/

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Table(name = "member")
@EntityListeners(AuditingEntityListener.class)
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "address", nullable = false, unique = true)
    private String address;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "nonce")
    private Long nonce;

    @CreatedDate
    @Column(name = "create_date", nullable = false, updatable = false)
    private LocalDateTime createDate;

    @Column(name = "rep_icon", nullable = false)
    private String repIcon;

    @Column(name = "playing", nullable = false)
    private String playing;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "game_id")
    private Game game;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Nft> nfts = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Achievement> achievements = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Seller> sellers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Buyer> buyers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Negotiation> negotiations = new ArrayList<>();

    @Builder
    public Member(Long id, String address, String nickname, String repIcon, String playing) {
        this.id = id;
        this.address = address;
        this.nickname = nickname;
        this.repIcon = repIcon;
        this.playing = playing;
        createNonce();
    }

    public void createNonce() {
        this.nonce = Double.valueOf(Math.floor(Math.random() * 10000000)).longValue();
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
