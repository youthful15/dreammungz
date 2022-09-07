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

    @Builder
    public Member(Long id, String address, String nickname, LocalDateTime createDate, String role, String repIcon, String playing) {
        this.id = id;
        this.nickname = nickname;
        this.createDate = createDate;
        this.role = role;
        this.repIcon = repIcon;
        this.playing = playing;
    }
}
