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
@Table(name = "game")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @Column(name = "cur_scene", nullable = false)
    private String curScene;

    @Column(name="mother")
    private Long mother;

    @Column(name="father")
    private Long father;

    @OneToOne(mappedBy = "game", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Member member;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameStatus> gameStatuses= new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameStory> gameStories= new ArrayList<>();

    @Builder
    public Game(Long id, String curScene) {
        this.id = id;
        this.curScene = curScene;
    }

    public void setMother(Long mother) {
        this.mother = mother;
    }

    public void setFather(Long father) {
        this.father = father;
    }

}
