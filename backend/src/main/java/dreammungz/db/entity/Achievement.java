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
@Table(name = "achievement")
public class Achievement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "achievement_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "achieve_date", nullable = false)
    private LocalDateTime achieveDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;

    @Builder
    public Achievement(Long id, String name, LocalDateTime achieveDate, Member member, Job job) {
        this.id = id;
        this.name = name;
        this.achieveDate = achieveDate;
        this.member = member;
        this.job = job;
    }
}
