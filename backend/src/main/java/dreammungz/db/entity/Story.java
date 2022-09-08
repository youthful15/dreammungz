package dreammungz.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
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
@Table(name = "story")
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "story_id")
    private Long id;

    @Column(name = "name")
    private String title;

    @Column(name = "scale")
    private String scale;

    @OneToMany(mappedBy = "story", cascade = CascadeType.ALL)
    private List<Scene> scenes = new ArrayList<>();

    @Builder
    public Story(Long id, String title, String scale) {
        this.id = id;
        this.title = title;
        this.scale = scale;
    }
}
