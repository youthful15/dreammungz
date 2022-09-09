package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Table(name = "Nft")
public class Nft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nft_id")
    private Long id;

    @Column(name = "token_id", nullable = false, unique = true)
    private Long tokenId;

    @Column(name = "image_url", nullable = false, unique = true)
    private String imageUrl;

    @Column(name = "hair", nullable = false)
    private String hair;

    @Column(name = "face", nullable = false)
    private String face;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "tier", nullable = false)
    private String tier;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @OneToMany(mappedBy = "nft", cascade = CascadeType.ALL)
    private List<NftStatus> nftStatuses = new ArrayList<>();

    @OneToMany(mappedBy = "nft", cascade = CascadeType.ALL)
    private List<Trade> trades = new ArrayList<>();

    @Builder
    public Nft(Long id, Long tokenId, String imageUrl, String hair, String face, String gender, String color, String tier, Member member, Job job) {
        this.id = id;
        this.tokenId = tokenId;
        this.imageUrl = imageUrl;
        this.hair = hair;
        this.face = face;
        this.gender = gender;
        this.color = color;
        this.tier = tier;
        this.member = member;
        this.job = job;
    }
}