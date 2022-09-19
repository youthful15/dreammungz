package dreammungz.api.controller;

/*
@author 박희조
@since 22. 09. 13.
 */

import dreammungz.api.dto.game.GameResponse;
import dreammungz.api.dto.game.GameStartPostReq;
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

    @ApiOperation(value = "게임 시작", notes = "게임을 시작하는 단계. 모든 초기 설정들이 이루어지고, 게임이 시작된다.")
    @PostMapping("/start")
    public ResponseEntity<GameResponse> gameStart(
            @RequestBody @ApiParam(value = "게임 시작 정보 (메이팅 or 분양)", required = true) GameStartPostReq gameStartInfo){
        /*
        게임 시작 3단계 프로세스
        1. 스탯 선정 (메이팅 or 분양)
        2. 기타 초기 설정
        3. 스토리 선정
        => front에 전송
         */

        //1. 스탯 설정 : 교배를 통한 게임 시작인지, 분양을 통한 게임 시작인지 확인하기 (DB에 저장)
        if(gameStartInfo.isMating()){
            //교배 조건. 메이팅의 성별이 유효한가? (남-father, 여-mother)
            if(!gameService.isGenderValid(gameStartInfo.getFather(), gameStartInfo.getMother())){
                //throw : 부모 개체의 성별이 유효하지 않습니다.
                throw new CustomException(CustomExceptionList.MATING_PARENT_GENDER_NOT_CORRECT);
            }
        }
        //메이팅 조건이 모두 일치하거나, 분양인 경우에만 실행
        gameService.inherited(gameStartInfo);

        //2. 기타 초기 설정 (게임 진행 여부 Y로 변경)
        gameService.checkGameStart(gameStartInfo.getAddress());

        //3. 게임 스토리 선정
        gameService.setStory(gameStartInfo.getAddress());

        //씬, 내용 + 스탯값들을 프론트에 보내기
        GameResponse gameResponse = gameService.getGameInformation(gameStartInfo.getAddress());
        return new ResponseEntity<>(gameResponse, HttpStatus.OK);
    }

}