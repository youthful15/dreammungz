package dreammungz.api.service;

import dreammungz.api.dto.nft.MyMuseumResponse;
import dreammungz.api.dto.nft.MyNftResponse;
import dreammungz.api.dto.nft.StatusNameValue;
import dreammungz.api.dto.nft.end.GameEndRequest;
import dreammungz.api.dto.nft.end.GameEndResponse;
import dreammungz.api.dto.nft.list.NftListRequest;
import dreammungz.api.dto.nft.list.NftListResponse;
import dreammungz.db.entity.*;
import dreammungz.db.repository.*;
import dreammungz.enums.*;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

    /*
    @author 신슬기
    @since 2022. 09. 15.
    */

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class NftService {
    private final NftRepository nftRepository;
    private final NftStatusRepository nftStatusRepository;
    private final MemberRepository memberRepository;
    private final GameStatusRepository gameStatusRepository;
    private final StatusRepository statusRepository;
    private final RequirementRepository requirementRepository;
    private final JobRepository jobRepository;
    private final TradeRepository tradeRepository;
    private final NftRepositorySupport nftRepositorySupport;
    private final GameStoryRepository gameStoryRepository;
    private final GameRepository gameRepository;
    private final AchievementRepository achievementRepository;


    /*
    NFT 필터 결과 조회
    since 2022. 09. 21
    발급된 모든 NFT를 필터링 결과에 맞춰서 조회
    */
    public NftListResponse searchNft(NftListRequest nftListRequest) {
        NftListResponse nftListResponse = new NftListResponse();
        //검색 조건(페이지당 데이터를 8개씩 조회)
        PageRequest pageRequest = PageRequest.of(nftListRequest.getPage(), 8);
        Page<Nft> nftList = null;
        //판매중인 NFT만 조회
        if (nftListRequest.isSell()) {
            nftList = nftRepositorySupport.findSell(pageRequest, nftListRequest);
        } else { //모든 NFT를 조회
            nftList = nftRepositorySupport.findAll(pageRequest, nftListRequest);
        }

        List<NftListResponse.NftInfo> nftInfos = new ArrayList<>();
        for (int i = 0; i < nftList.getContent().size(); i++) {
            Nft nftItem = nftList.getContent().get(i);
            boolean isSell = false;
            Long price = 0L;

            //판매중인지 아닌지 체크(판매중이면 가격도 확인)
            if (tradeRepository.existsByNft(nftItem)) {
                List<Trade> trades = tradeRepository.findByNft(nftItem);
                for (Trade trade : trades) {
                    if (trade.getCancel().equals(Check.N) && trade.getState().equals(State.PROCEEDING)) {
                        isSell = true;
                        price = trade.getStartPrice();
                        break;
                    }
                }
            }

            //판매여부와 상관 없이 스탯 이름과 값 추가
            List<NftListResponse.NftInfo.StatusList> statusLists = new ArrayList<>();
            for (int j = 0; j < nftItem.getNftStatuses().size(); j++) {
                statusLists.add(new NftListResponse.NftInfo.StatusList(nftItem.getNftStatuses().get(j).getStatus().getName(), nftItem.getNftStatuses().get(j).getValue()));
            }

            //NFT 관련 정보 담기
            NftListResponse.NftInfo nftInfo = NftListResponse.NftInfo.builder()
                    .id(nftItem.getTokenId())
                    .url(nftItem.getImageUrl())
                    .metadata(nftItem.getMetadata())
                    .job(nftItem.getJob().getName())
                    .hair(nftItem.getHair())
                    .tier(nftItem.getTier())
                    .color(nftItem.getColor())
                    .gender(nftItem.getGender())
                    .face(nftItem.getFace())
                    .sell(isSell)
                    .price(price)
                    .status(statusLists)
                    .build();
            nftInfos.add(nftInfo);
        }

        nftListResponse.setItems(nftInfos);
        nftListResponse.setCurrentPage(nftList.getPageable().getPageNumber()); //현재 페이지
        nftListResponse.setTotalPage(nftList.getTotalPages() - 1); //마지막 페이지

        return nftListResponse;
    }

    /*
    회원의 판매중이지 않은 NFT 조회
    게임 시작 전 웨딩모드에서 사용
    @author 신슬기
    @since 2022. 09. 23.
    */
    public MyNftResponse myNftList(String address) {
        MyNftResponse nftListResponse = new MyNftResponse();
        Member member = getMember(address); //지갑 주소로 플레이어 정보 조회
        List<Nft> nftList = nftRepositorySupport.findAllByMember(member); //플레이어가 소유하고 있는 모든 NFT 조회
        List<MyNftResponse.NftInfo> nftInfos = new ArrayList<>(); //NFT 정보에 대한 리스트
        for (Nft nft:nftList) {
            //판매 상태 확인
            boolean isSell = false;
            if (tradeRepository.existsByNft(nft)) {
                List<Trade> trades = tradeRepository.findByNft(nft);
                for (Trade trade : trades) {
                    if (trade.getCancel().equals(Check.N) && trade.getState().equals(State.PROCEEDING)) {
                        isSell = true;
                        break;
                    }
                }
            }

            //해당 NFT의 추가 스탯 조회
            List<MyNftResponse.NftInfo.StatusList> statusLists = new ArrayList<>();
            for (int j = 0; j < nft.getNftStatuses().size(); j++) {
                statusLists.add(new MyNftResponse.NftInfo.StatusList(nft.getNftStatuses().get(j).getStatus().getName(), nft.getNftStatuses().get(j).getValue()));
            }

            //판매중이 아닌 경우에만 NFT 관련 정보 담기
            if (!isSell) {
                MyNftResponse.NftInfo nftInfo = MyNftResponse.NftInfo.builder()
                        .id(nft.getTokenId())
                        .url(nft.getImageUrl())
                        .tier(nft.getTier())
                        .gender(nft.getGender())
                        .status(statusLists)
                        .build();
                nftInfos.add(nftInfo);
            }
        }
        nftListResponse.setItems(nftInfos);

        return nftListResponse;
    }

    /*
    직업별로 가장 높은 등급의 NFT 10개 조회(자르는 기준->직업 등급)
    박물관에서 사용
    @author 신슬기
    @since 2022. 09. 30.
    */
    public MyMuseumResponse myMuseumList(String address) {
        MyMuseumResponse museumResponse = new MyMuseumResponse();
        Member member = getMember(address); //지갑 주소로 플레이어 정보 조회

        // 티어를 기준으로 정렬하기 위한 ArrayList 생성
        List<String> tierList = new ArrayList<>();
        Tier[] tiers = Tier.values();
        for(Tier tier:tiers){
            System.out.println(tier.toString());
            tierList.add(tier.toString());
        }


        List<Nft> nftList = nftRepositorySupport.findAllByMemberAndTier(member, tierList); //플레이어가 소유하고 있는 모든 NFT 조회
        List<MyMuseumResponse.NftInfo> nftInfos = new ArrayList<>(); //NFT 정보에 대한 리스트
        boolean[] jobList = new boolean[JobName.values().length+1]; //직업 선택했는지 확인
        for (Nft nft:nftList) {
            if(nftInfos.size()==10){ //데이터 10개 선택
                break;
            }
            //해당 직업을 넣치 않았으면 추가
            if(!jobList[nft.getJob().getId().intValue()]) {
                jobList[nft.getJob().getId().intValue()]=true;
                //해당 NFT의 추가 스탯 조회
                List<MyMuseumResponse.NftInfo.StatusList> statusLists = new ArrayList<>();
                for (int j = 0; j < nft.getNftStatuses().size(); j++) {
                    statusLists.add(new MyMuseumResponse.NftInfo.StatusList(nft.getNftStatuses().get(j).getStatus().getName(), nft.getNftStatuses().get(j).getValue()));
                }
                MyMuseumResponse.NftInfo nftInfo = MyMuseumResponse.NftInfo.builder()
                        .id(nft.getTokenId())
                        .metadata(nft.getMetadata())
                        .url(nft.getImageUrl())
                        .hair(nft.getHair())
                        .face(nft.getFace())
                        .tier(nft.getTier())
                        .color(nft.getColor())
                        .gender(nft.getGender())
                        .job(nft.getJob().getName())
                        .status(statusLists)
                        .build();
                nftInfos.add(nftInfo);
            }
        }
        museumResponse.setItems(nftInfos);

        return museumResponse;
    }

    /*
    NFT 정보 저장
     */
    public void saveNft(String address, GameEndRequest gameEndRequest) {
        Nft nft = Nft.builder()
                .tokenId(gameEndRequest.getId())
                .imageUrl(gameEndRequest.getUrl())
                .metadata(gameEndRequest.getMetadata())
                .hair(gameEndRequest.getHair())
                .face(gameEndRequest.getFace())
                .gender(gameEndRequest.getGender())
                .color(gameEndRequest.getColor())
                .tier(gameEndRequest.getTier())
                .member(getMember(address))
                .job(getJobByName(gameEndRequest.getJob()))
                .build();
        nftRepository.save(nft); //NFT 정보 저장

        //NFT 추가 스탯 저장
        for (int i = 0; i < gameEndRequest.getStatus().size(); i++) {
            NftStatus nftStatus = NftStatus.builder()
                    .value(gameEndRequest.getStatus().get(i).getValue())
                    .nft(nft)
                    .status(getStatusByName(gameEndRequest.getStatus().get(i).getName()))
                    .build();
            nftStatusRepository.save(nftStatus);
        }

        //업적 기록
        Achievement achievement = achievementRepository.findByMemberAndJob(nft.getMember(), nft.getJob()).get();
        if (achievement.getAchieve() == Check.N) { //성취하지 않은 업적이라면, 조건에 상관 없이 등급과 달성일 업데이트
            achievement.setTier(nft.getTier());
            achievement.setAchieveDate(LocalDateTime.now());
        } else { //성취했던 업적이라면, 기존에 달성한 등급보다 높은 등급일 경우만 등급과 달성일 업데이트
            if (nft.getTier().ordinal() > achievement.getTier().ordinal()) {
                achievement.setTier(nft.getTier());
                achievement.setAchieveDate(LocalDateTime.now());
            }
        }
        achievement.setAchieve(Check.Y);
        achievementRepository.save(achievement);
    }

    /*
    게임 데이터 삭제
     */
    public void deleteGame(String address) {
        //게임 데이터 삭제 및 변경
        Member member = getMember(address);
        Game game = member.getGame();
        member.setPlaying(Check.N); //플레이 상태 N으로 변경
        member.setGame(null); //플레이중인 데이터 null 처리
        memberRepository.save(member); //변경 값 저장

        //게임 Status 삭제
        List<GameStatus> statuses = gameStatusRepository.findAllByGameId(game.getId());
        for (GameStatus gameStatus:statuses) {
            gameStatusRepository.deleteById(gameStatus.getId());
        }

        //게임 스토리 삭제
        List<GameStory> stories = gameStoryRepository.findAllByGameId(game.getId());
        for (GameStory gameStory:stories) {
            gameStoryRepository.deleteById(gameStory.getId());
        }

        //게임 데이터 삭제
        gameRepository.deleteById(game.getId());
    }

    /*
    게임 엔딩 결정
    0. 엔딩페이지인지 확인
    1. 색 결정
    2. 모질 결정(랜덤)
    3. 얼굴 결정(랜덤)
    4. 성별 결정(랜덤)
    5. 카드 스탯 결정
    6. 직업 결정
    7. 추가 스탯 설정
    */
    public GameEndResponse makeEnd(String address) {
        GameEndResponse gameEndResponse = new GameEndResponse();
        //0. 현재 장면이 8번이 아니면 엔딩이 아니기 때문에 예외 처리
        Game gameData = getMember(address).getGame();
        if (gameData.getCurScene() != 8) {
           throw new CustomException(CustomExceptionList.NOT_GAME_ENDING);
        }
        //1. 색 결정
        Long mother = gameData.getMother(); //엄마 tokenId
        Long father = gameData.getFather(); //아빠 tokenId
        //Color[색상단계][단계에 해당하는 색상들]
        Color[][] colors = {{Color.WHITE, Color.BLACK, Color.BROWN}, {Color.RED, Color.YELLOW, Color.GREEN, Color.BLUE},
                {Color.PINK, Color.ORANGE, Color.PURPLE}, {Color.GOLD, Color.RAINBOW}};
        if (mother == null || father == null) { //연계 요소 없이 아기강아지로 시작한 경우
            //1단계중 색상 1개 선택
            gameEndResponse.setColor(colors[0][getNumber(3)]);
        } else { //연계되는 부모 강아지가 있는 경우
            int motherColorStage = -1; //엄마 강아지의 색상 단계
            Color motherColor = getNft(mother).getColor(); //엄마 강아지의 색상 값
            int fatherColorStage = -1; //아빠 강아지의 색상 단계
            Color fatherColor = getNft(father).getColor(); //아빠 강아지의 색상 값
            for (int idx = 0; idx < 4; idx++) { //엄마, 아빠 강아지의 색상 단계 값을 찾기
                for (int size = 0; size < colors[idx].length; size++) {
                    if (motherColor.equals(colors[idx][size])) motherColorStage = idx;
                    if (fatherColor.equals(colors[idx][size])) fatherColorStage = idx;
                }
            }

            //색상 조합 결정
            //색상 몇단계끼리의 조합
            int[][] colorStage = {{0, 0}, {0, 1}, {0, 2}, {0, 3}, {1, 1}, {1, 2}, {1, 3}, {2, 2}, {2, 3}, {3, 3}};
            //색상 조합에 맞는 확률(배열값보다 작거나 같은값, -1은 0%를 의미)
            int[][] colorPercent = {{-1, 99, -1, -1}, {29, 89, 99, -1}, {19, 74, 94, 99}, {9, 49, 89, 99},
                    {-1, 49, 99, -1}, {-1, 29, 89, 99}, {-1, 19, 79, 99}, {-1, -1, 89, 99}, {-1, -1, 69, 99}, {-1, -1, 49, 99}};

            //색 결정
            for (int idx = 0; idx < colorStage.length; idx++) {
                //색상 몇단계끼리의 조합인지 찾기
                if ((colorStage[idx][0] == motherColorStage && colorStage[idx][1] == fatherColorStage) ||
                        (colorStage[idx][0] == fatherColorStage && colorStage[idx][1] == motherColorStage)) {
                    int randomColor = getNumber(100);
                    int colorIndex = 0;
                    //조합에 맞는 확률 찾고 색 반환(현재는 같은 단계에 존재하는 색 확률이 같음)
                    for (int percent : colorPercent[idx]) {
                        if (randomColor <= percent) {
                            gameEndResponse.setColor(colors[colorIndex][getNumber(colors[colorIndex].length)]);
                            break;
                        }
                        if (colorIndex < 3) {
                            colorIndex++;
                        }
                    }
                    break;
                }
            }
        }

        //2. 모질 결정[성별-모질이 중복되지 않기 위해 난수범위를 4까지 생성]
        Hair[] hair = Hair.values();
        gameEndResponse.setHair(hair[getNumber(hair.length * 2) % 2]);

        //3. 얼굴 결정
        Face[] face = Face.values();
        gameEndResponse.setFace(face[getNumber(face.length)]);

        //4. 성별 결정
        Gender[] gender = Gender.values();
        gameEndResponse.setGender(gender[getNumber(gender.length)]);

        //5. 카드 스탯 결정(배열값보다 작거나 같은값, -1은 0%를 의미)
        Tier[] tier = Tier.values();
        int[] statusRanges = {10, 15, 21, 29, 36, 44, 51, 60};
        int[][] tierValues = {{79, 94, 98, 99, -1}, {29, 79, 94, 99, -1}, {29, 64, 89, 99, -1}, {19, 49, 79, 98, 99},
                {9, 29, 69, 94, 99}, {4, 19, 59, 89, 99}, {-1, 9, 44, 84, 99}, {-1, -1, 29, 79, 99}};
        List<GameStatus> gameStatusList = gameStatusRepository.findGameStatusByGame(gameData);
        List<StatusNameValue> statusList = new ArrayList<>();
        int totalStatus = 0;
        for (GameStatus gameStatus : gameStatusList) {
            if (gameStatus.getStatus().getId() != 11) { //총 스탯값 계산과 함께 추가 스탯 계산에 필요한 값 추가
                statusList.add(new StatusNameValue(gameStatus.getStatus().getName(), gameStatus.getValue()));
                totalStatus += gameStatus.getValue();
            }
        }
        //5-1. 스탯 총합 범위 찾기
        int statusIndex = 0;
        for (int statusRange : statusRanges) {
            if (totalStatus <= statusRange) {
                break;
            }
            if (statusIndex < 7) {
                statusIndex++;
            }
        }
        //5-2. 카드 등급 결정
        int randomTier = getNumber(100);//0~99사이의 랜덤값 선택
        int tierIndex = 0;
        for (int percent : tierValues[statusIndex]) {
            if (randomTier <= percent) {
                gameEndResponse.setTier(tier[tierIndex]);
                break;
            }
            tierIndex++;
        }

        //6. 직업 결정
        //6-1. 상위 직업부터 하위 직업까지 조건을 충족하는지 확인
        JobName[] jobs = JobName.values();
        int jobIndex = 0;
        for (int idx = 1; idx <= jobs.length; idx++) {
            boolean satisfied = true;
            List<Requirement> requirementList = requirementRepository.findRequirementByJob(getJob(Long.valueOf(idx)));
            for (Requirement requirement : requirementList) {
                Long statusIdx = requirement.getStatus().getId();
                //정의로움 음수값 판단 로직 추가(양수*음수=음수, 양수*양수=양수, 음수*음수=양수, 양수or음수*0=0 원리 이용)
                if (statusIdx == 11) {
                    if (getGameStatus(gameData, getStatus(statusIdx)).getValue() * requirement.getSatisfiedAmount() <= 0) {
                        satisfied = false;
                        break;
                    }
                }else {
                    if (getGameStatus(gameData, getStatus(statusIdx)).getValue() < requirement.getSatisfiedAmount()) {
                        satisfied = false;
                        break;
                    }
                }
            }
            if (satisfied) {
                break; //직업 조건을 충족한 경우, 해당 직업 반환
            } else {
                if (jobIndex < 27) {
                    jobIndex++; //직업 조건을 충족하지 않은 경우, 다른 직업은 조건을 충족하는지 탐색
                }
            }
        }
        gameEndResponse.setJob(jobs[jobIndex]);

        //7. 추가 스탯 설정 tierIndex에 +1해서 능력치 부여(인덱스는 0부터 시작하기 때문에)
        //정의를 제외한 스탯을 뽑고 정렬 or 윗 단계에서 미리 뽑기
        //정렬을 통해 가장 큰 데이터 뽑기
        //가장 큰 데이터 빼고 다른 데이터 뽑기(중복 x)
        statusList.sort(Collections.reverseOrder()); //값이 큰 순서로 정렬
        ArrayList<GameEndResponse.StatusList> addStatusList = new ArrayList<>();
        int[] selected = new int[tierIndex + 1]; //가장 높은값+랜덤값 선택을 위한 배열
        selected[0] = 0; //가장 높은 값 미리 넣기
        for (int i = 1; i < tierIndex + 1; i++) {
            selected[i] = getNumber(10);
            for (int j = 0; j < i; j++) {
                if (selected[i] == selected[j]) { //뽑았던 값을 뽑으면 다시 랜덤 값 뽑기
                    i--;
                }
            }
        }

        //가장 높은값 1개 + 카드 등급에 따라 랜덤으로 뽑은 값 넣기
        for (int i = 0; i < tierIndex + 1; i++) {
            addStatusList.add(new GameEndResponse.StatusList(statusList.get(selected[i]).getName(), Long.valueOf(tierIndex + 1)));
        }
        gameEndResponse.setStatus(addStatusList);

        return gameEndResponse;
    }

    //수 0~range-1 중 1개 랜덤 선택
    private int getNumber(int range) {
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());
        return random.nextInt(range);
    }

    private Member getMember(String address) {
        Member member = memberRepository.findByAddress(address).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
        return member;
    }

    private Job getJob(Long jobId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new CustomException(CustomExceptionList.JOB_NOT_FOUND));
        return job;
    }

    private Job getJobByName(String jobName) {
        Job job = jobRepository.findByName(JobName.valueOf(jobName)).orElseThrow(() -> new CustomException(CustomExceptionList.JOB_NOT_FOUND));
        return job;
    }

    private GameStatus getGameStatus(Game game, Status status) {
        GameStatus gameStatus = gameStatusRepository.findGameStatusByGameAndStatus(game, status).orElseThrow(() -> new CustomException(CustomExceptionList.GAMESTATUS_NOT_FOUND));
        return gameStatus;
    }

    private Status getStatus(Long statusId) {
        Status status = statusRepository.findById(statusId).orElseThrow(() -> new CustomException(CustomExceptionList.STATUS_NOT_FOUND));
        return status;
    }

    private Status getStatusByName(String statusName) {
        Status status = statusRepository.findByName(StatusName.valueOf(statusName)).orElseThrow(() -> new CustomException(CustomExceptionList.STATUS_NOT_FOUND));
        return status;
    }

    private Nft getNft(Long tokenId) {
        Nft nft = nftRepository.findNftByTokenId(tokenId).orElseThrow(() -> new CustomException(CustomExceptionList.NFT_NOT_FOUND));
        return nft;
    }
}
