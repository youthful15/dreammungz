package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "address", nullable = false, unique = true)
    private String address;

    @Column(name = "nickname", unique = true)
    private String nickname;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "rep_icon", nullable = false)
    private String repIcon;

    @Column(name = "playing", nullable = false)
    private String playing;

    @Column(name = "resigned", nullable = false)
    private String resigned;

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
    public Member(Long id, String address, String nickname, LocalDateTime createDate, String role, String repIcon, String playing, String resigned) {
        this.id = id;
        this.address = address;
        this.nickname = nickname;
        this.createDate = createDate;
        this.role = role;
        this.repIcon = repIcon;
        this.playing = playing;
        this.resigned = resigned;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}
