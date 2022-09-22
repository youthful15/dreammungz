package dreammungz.api.controller;

/*
@author 박희조
@since 22. 09. 13.
 */

import dreammungz.api.dto.game.GameInfoRequest;
import dreammungz.api.dto.game.GameResponse;
import dreammungz.api.dto.game.GameStartRequest;
import dreammungz.api.service.GameService;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/game")
public class GameController{

    final GameService gameService;
    @ApiOperation(value = "게임 정보", notes = "게임 정보 출력. 현재 게임이 진행중인 사용자인지, 선택지는 몇번인지 구분해준다.")
    @PostMapping("/info")
    public ResponseEntity<GameResponse> gameInfo(
            @RequestBody @ApiParam(value = "게임 시작 정보 (메이팅 or 분양)", required = true) GameInfoRequest gameInfo){
        /*
        게임 정보 3단계 프로세스
        1. 게임 중인지, 특수 상황(재접속 or 새로시작)인지 체크
        1-1. 게임중이라면, 선택지에 따른 다음 씬 출력
        1-2-1. 특수상황 중 재접속이라면, 현재 씬 출력
        1-2-2. 특수상황 중 새로시작이라면, null 출력
        => front에 전송
         */
        GameResponse gameResponse = new GameResponse();
        //1. 게임중인지, 특수상황인지 체크
        if(gameInfo.getSelection() > -1){
            //1-1. 게임중이라면, 선택지에 따른 다음 씬 출력
            gameService.setNextGame(gameInfo);  //선택지에 따른 다음 씬으로 DB를 갱신
            gameResponse = gameService.getGameInformation(gameInfo.getAddress());   //갱신된 DB를 가져오기
        }
        else{
            //1-2. 특수상황
            if(gameService.checkGameStarted(gameInfo.getAddress())){
                //1-2-1. 특수상황 중 재접속이라면, 현재 씬 출력
                gameResponse = gameService.getGameInformation(gameInfo.getAddress());
            }
            //1-2-2. 특수상황 중 새로시작이라면, null 출력
        }
        //씬, 내용 + 스탯값들을 프론트에 보내기
        return new ResponseEntity<>(gameResponse, HttpStatus.OK);
    }
    @ApiOperation(value = "게임 시작", notes = "게임을 시작하는 단계. 모든 초기 설정들이 이루어지고, 게임이 시작된다.")
    @PostMapping("/start")
    public ResponseEntity<GameResponse> gameStart(
            @RequestBody @ApiParam(value = "게임 시작 정보 (메이팅 or 분양)", required = true) GameStartRequest gameStart){
        /*
        게임 시작 3단계 프로세스
        1. 스탯 선정 (메이팅 or 분양)
        2. 기타 초기 설정
        3. 스토리 선정
        => front에 전송
         */

        //1. 스탯 설정 : 교배를 통한 게임 시작인지, 분양을 통한 게임 시작인지 확인하기 (DB에 저장)
        if(gameStart.isMating()){
            //교배 조건. 메이팅의 성별이 유효한가? (남-father, 여-mother)
            if(!gameService.isGenderValid(gameStart.getFather(), gameStart.getMother())){
                //throw : 부모 개체의 성별이 유효하지 않습니다.
                throw new CustomException(CustomExceptionList.MATING_PARENT_GENDER_NOT_CORRECT);
            }
        }
        //메이팅 조건이 모두 일치하거나, 분양인 경우에만 실행
        gameService.inherited(gameStart);

        //2. 기타 초기 설정 (게임 진행 여부 Y로 변경)
        gameService.setGameStart(gameStart.getAddress());

        //3. 게임 스토리 선정
        gameService.setStory(gameStart.getAddress());

        //씬, 내용 + 스탯값들을 프론트에 보내기
        GameResponse gameResponse = gameService.getGameInformation(gameStart.getAddress());
        return new ResponseEntity<>(gameResponse, HttpStatus.OK);
    }

}