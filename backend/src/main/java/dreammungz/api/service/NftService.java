package dreammungz.api.service;

import dreammungz.api.dto.nft.GameEndRequest;
import dreammungz.api.dto.nft.GameEndResponse;
import dreammungz.api.dto.nft.StatusNameValue;
import dreammungz.db.entity.*;
import dreammungz.db.repository.*;
import dreammungz.enums.*;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    private final GameRepository gameRepository;
    private final GameStatusRepository gameStatusRepository;
    private final StatusRepository statusRepository;
    private final RequirementRepository requirementRepository;
    private final JobRepository jobRepository;

    /*
    NFT 정보 저장
     */
    public void saveNft(String address, GameEndRequest gameEndRequest) {
        Nft nft = Nft.builder()
                .tokenId(gameEndRequest.getId())
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
    }

    /*
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
        // 1. 색 결정
        Game gameData = getMember(address).getGame();
        Long mother = gameData.getMother();
        Long father = gameData.getFather();
        Color[][] colors = {{Color.WHITE, Color.BLACK, Color.BROWN}, {Color.RED, Color.YELLOW, Color.GREEN, Color.BLUE},
                {Color.PINK, Color.ORANGE, Color.PURPLE}, {Color.GOLD, Color.RAINBOW}};
        if (mother == null || father == null) {
            //1단계중 색상 1개 선택
            gameEndResponse.setColor(colors[0][getNumber(3)]);
        } else {
            int motherColorStage = -1;
            Color motherColor = getNft(mother).getColor();
            int fatherColorStage = -1;
            Color fatherColor = getNft(father).getColor();
            for (int idx = 0; idx < 4; idx++) {
                for (int size = 0; size < colors[idx].length; size++) {
                    if (motherColor.equals(colors[idx][size])) motherColorStage = idx;
                    if (fatherColor.equals(colors[idx][size])) fatherColorStage = idx;
                }
            }

            //조합 결정
            //몇단계끼리의 조합
            int[][] colorStage = {{0, 0}, {0, 1}, {0, 2}, {0, 3}, {1, 1}, {1, 2}, {1, 3}, {2, 2}, {2, 3}, {3, 3}};
            //조합에 맞는 확률
            int[][] colorPercent = {{-1, 99, -1, -1}, {29, 89, 99, -1}, {19, 74, 94, 99}, {9, 49, 89, 99},
                    {-1, 49, 99, -1}, {-1, 29, 89, 99}, {-1, 19, 79, 99}, {-1, -1, 89, 99}, {-1, -1, 69, 99}, {-1, -1, 49, 99}};

            //색 결정
            for (int idx = 0; idx < colorStage.length; idx++) {
                //(색상)몇단계끼리의 조합인지 찾기
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
            if (gameStatus.getStatus().getId() != 11) { //총 스탯값 계산과 함께 추가 스탯 계산에 필요한 값 계산
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
                if (getGameStatus(gameData, getStatus(statusIdx)).getValue() < requirement.getSatisfiedAmount()) {
                    satisfied = false;
                }
            }
            if (satisfied) {
                break;
            } else {
                if (jobIndex < 27) {
                    jobIndex++;
                }
            }
        }
        gameEndResponse.setJob(jobs[jobIndex]);

        //7. 추가 스탯 설정 tierIndex에 +1해서 능력치 부여
        //정의를 제외한 스탯을 뽑고 정렬 or 윗 단계에서 미리 뽑기
        //정렬을 통해 가장 큰 데이터 뽑기
        //가장 큰 데이터 빼고 다른 데이터 뽑기(중복 x)
        statusList.sort(Collections.reverseOrder());
        ArrayList<GameEndResponse.StatusList> addStatusList = new ArrayList<>();
        int[] selected = new int[tierIndex + 1];
        selected[0] = 0;
        for (int i = 1; i < tierIndex + 1; i++) {
            selected[i] = getNumber(10);
            for (int j = 0; j < i; j++) {
                if (selected[i] == selected[j]) {
                    i--;
                }
            }
        }

        //가장 높은값 1개 + 카드 등급에 따라 랜덤으로 뽑은 값 넣기
        for (int i = 0; i < tierIndex + 1; i++) {
            addStatusList.add(new GameEndResponse.StatusList(statusList.get(selected[i]).getName(), statusList.get(selected[i]).getValue()));
        }
        gameEndResponse.setStatus(addStatusList);

        //게임 데이터 삭제 로직이 들어가는 부분(테스트할 때 게임 데이터 날라갈 것 같아서 일단 제외했습니다. 추후 추가)
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

    private Game getGame(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new CustomException(CustomExceptionList.GAME_NOT_FOUND));
        return game;
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
