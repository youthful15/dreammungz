package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

/*
@author 황승주
@since 2022. 09. 07.
*/

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@Entity
@Getter
@Table(name = "selection")
public class Selection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "status_value")
    private Long statusValue;

    @Column(name = "next_scene")
    private Long nextScene;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scene_id")
    private Scene scene;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private Status status;

    @Builder
    public Selection(Long id, String content, Long statusValue, Long nextScene, Scene scene, Status status) {
        this.id = id;
        this.content = content;
        this.statusValue = statusValue;
        this.nextScene = nextScene;
        this.scene = scene;
        this.status = status;
    }
}
