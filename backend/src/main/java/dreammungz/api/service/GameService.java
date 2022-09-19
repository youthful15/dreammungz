package dreammungz.api.service;

/*
@author 박희조
@since 2022. 09. 13.
 */

import dreammungz.api.dto.game.GameDto;
import dreammungz.api.dto.game.GameResponse;
import dreammungz.api.dto.game.GameStartPostReq;
import dreammungz.db.entity.*;
import dreammungz.db.repository.*;
import dreammungz.enums.*;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class GameService{
    final MemberRepository memberRepository;
    final GameRepository gameRepository;
    final GameStatusRepository gameStatusRepository;
    final StatusRepository statusRepository;
    final StoryRepository storyRepository;
    final GameStoryRepository gameStoryRepository;
    final SceneRepository sceneRepository;
    final SelectionRepository selectionRepository;
    final NftRepository nftRepository;
    final NftStatusRepository nftStatusRepository;

    public boolean isGenderValid(Long father, Long mother){
        //부모의 성별이 유효하게 지정되었는지 체크
        return (nftRepository.findById(father).get().getGender() == Gender.M)
                && (nftRepository.findById(mother).get().getGender() == Gender.F);
    }

    public void inherited(GameStartPostReq gameStartInfo){
        System.out.println("LET'S inherited");
        //[DB] [Game] 생성
        Game game = new Game(null, null);
        game.setCurScene((long) 1);
        //주소가 일치하는 멤버가 있는지 먼저 체크하기
        Member member = memberRepository.findByAddress(gameStartInfo.getAddress())
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        //[DB] [Member] Game id 연결
        member.setGame(game);
        //기본 스탯 생성
        List<GameStatus> gameStatuses = new ArrayList<>();
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.STOUTNESS).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.CLEVER).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.QUICK).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.INTUITION).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.CHARISMA).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.POPULARITY).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.SENSIBILITY).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.FOOTWORK).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.VOICE).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.WEALTH).get()));
        gameStatuses.add(new GameStatus((long) 0, game, statusRepository.findByName(StatusName.JUSTICE).get()));
        //메이팅인 경우
        if(gameStartInfo.isMating()){
            //[DB] [Game] 부모 정보 입력
            game.setMother(gameStartInfo.getMother());
            game.setFather(gameStartInfo.getFather());
            //[DB] [Nft_Status] 능력치 데이터 읽어오기
            List<NftStatus> parentStatuses = nftStatusRepository.findAllById(gameStartInfo.getFather());
            parentStatuses.addAll(nftStatusRepository.findAllById(gameStartInfo.getMother()));
            for(NftStatus parentStatus : parentStatuses){
                for(GameStatus gameStatus : gameStatuses){
                    if(gameStatus.getStatus().equals(parentStatus.getStatus())){
                        //스탯 합산
                        parentStatus.setValue(parentStatus.getValue() + gameStatus.getValue());
                        break;
                    }
                }
            }
        }
        //[DB] [Game_Status] 생성. 스탯 반영
        gameStatusRepository.saveAll(gameStatuses);
    }

    public void checkGameStart(String address){
        System.out.println("LET'S checkGameStart");
        //주소가 일치하는 멤버가 있는지 먼저 체크하기
        Member member = memberRepository.findByAddress(address)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        //[DB] [Member] 게임진행여부(playing) Y로 변경
        member.setPlaying(Check.Y);
        memberRepository.save(member);
    }

    public void setStory(String address){
        System.out.println("LET'S setStory");
        System.out.println("[STAGE1] get Game");
        Game game = memberRepository.findByAddress(address).get().getGame();

        System.out.println("[STAGE2-1] get shortStories");
        List<Story> shortStories = storyRepository.findAllByType(StoryType.SHORT);
        System.out.println("[STAGE2-2] get normalStories");
        List<Story> normalStories = storyRepository.findAllByType(StoryType.NORMAL);
        System.out.println("[STAGE2-3] get longStories");
        List<Story> longStories = storyRepository.findAllByType(StoryType.LONG);

        int shortListCount = shortStories.size();
        int normalListCount = normalStories.size();
        int longListCount = longStories.size();


        final int shortFinalCount = 2;
        final int normalFinalCount = 0;
        final int longFinalCount = 0;

//        final int storiesFinalCount = shortFinalCount + normalFinalCount + longFinalCount + 2;
        final int storiesFinalCount = 1;
        System.out.println("[STAGE3] get RANDOM");
        //랜덤 1단계. 각 유형별 스토리들을 랜덤으로 뽑는다.


        //랜덤 2단계. 그 스토리들의 번호를 뽑는다.

        //랜덤 3단계. 뽑힌 번호를 기준으로 배열을 정리한다.
        StoryType selectedStoriesType[] = new StoryType[storiesFinalCount];
        int selectedStoriesNum[] = new int[storiesFinalCount];

        System.out.println("[STAGE4] get Start and End");
        //시작과 끝은 정해진 story
        selectedStoriesType[0] = StoryType.START;
        selectedStoriesNum[0] = 0;
//        selectedStoriesType[storiesFinalCount-1] = StoryType.END;
//        selectedStoriesNum[storiesFinalCount-1] = 0;

        System.out.println("[STAGE5] set story List");
        //선택된 스토리들 LIST로 담기
        List<GameStory> selectedGameStories = new ArrayList<>();
        for(int i =0; i<storiesFinalCount; i++){
            switch(selectedStoriesType[i]){
                case START:
                    //시작 스토리는 맨 처음에 오게 하기
                    selectedGameStories.add(new GameStory(
                            (long) i, State.PROCEEDING,game,
                            storyRepository.findAllByType(StoryType.START).get(selectedStoriesNum[i])));
                    break;
                case SHORT:
                    selectedGameStories.add(new GameStory(
                            (long) i, State.INCOMPLETE,game,
                            storyRepository.findAllByType(StoryType.SHORT).get(selectedStoriesNum[i])));
                    break;
                case NORMAL:
                    selectedGameStories.add(new GameStory(
                            (long) i, State.INCOMPLETE,game,
                            storyRepository.findAllByType(StoryType.NORMAL).get(selectedStoriesNum[i])));
                    break;
                case LONG:
                    selectedGameStories.add(new GameStory(
                            (long) i, State.INCOMPLETE,game,
                            storyRepository.findAllByType(StoryType.LONG).get(selectedStoriesNum[i])));
                    break;
                case END:
                    selectedGameStories.add(new GameStory(
                            (long) i, State.INCOMPLETE,game,
                            storyRepository.findAllByType(StoryType.END).get(selectedStoriesNum[i])));
                    break;
            }
        }
        System.out.println("[STAGE6] set DB story List");

        //[DB] [Game_Story] 스토리 순서대로 입력
        gameStoryRepository.saveAll(selectedGameStories);
    }

    public GameResponse getGameInformation(String address){
        System.out.println("LET's getGameInformation");
        GameResponse gameResponse = new GameResponse();
        //현재 씬 번호 알아오기
        Long scene = memberRepository.findByAddress(address).get().getGame().getCurScene();
        //현재 스토리 번호 알아오기
        Long story = sceneRepository.findById(scene).get().getStory().getId();
        //현재 스토리 제목 알아오기
        gameResponse.setTitle(storyRepository.findById(story).get().getTitle());
        //현재 씬 내용 알아오기
        gameResponse.setContent(sceneRepository.findById(scene).get().getContent());
        //선택지 개수 알아보기
        List<Selection> dbSelections = selectionRepository.findAllBySceneId(scene);
        int selectionCount = dbSelections.size();
        //선택지 개수만큼 array 입력하기
        String selections[] = new String[selectionCount];
        for(int i =0; i<selectionCount; i++){
            selections[i] = dbSelections.get(i).getContent();
        }
        //선택지 내용들 삽입하기
        gameResponse.setSelection(selections);

        //현재 스탯 정보 알아오기
        List<GameStatus> dbStatuses = gameStatusRepository.findAllByGameId(memberRepository.findByAddress(address).get().getGame().getId());
        List<GameDto> outputStatus = new ArrayList<>();

        //gameResponse에 합치기
        for(GameStatus status : dbStatuses){
            if(status.getStatus().getName() == StatusName.JUSTICE){
                gameResponse.setJustice(status.getValue());
            }
            else {
                outputStatus.add(new GameDto(status.getStatus().getName(), status.getValue()));
            }
        }
        gameResponse.setStatus(outputStatus);
        return gameResponse;
    }
}