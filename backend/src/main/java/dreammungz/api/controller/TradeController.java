package dreammungz.api.controller;

import dreammungz.api.dto.game.GameInfoRequest;
import dreammungz.api.dto.trade.TradeRegisterRequest;
import dreammungz.api.dto.trade.TradeStopRequest;
import dreammungz.api.service.TradeService;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
@author 박희조
@since 22. 09. 22.
 */

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/trade")
public class TradeController {
    final TradeService tradeService;

    @ApiOperation(value = "NFT 판매 등록", notes = "판매페이지에 NFT를 등록한다.")
    @PostMapping("/register")
    public ResponseEntity<TradeRegisterRequest> registerNft(
            @RequestBody @ApiParam(value = "판매 등록을 위한 판매자, NFT 정보", required = true) TradeRegisterRequest tradeRegisterRequest){
        tradeService.registerNft(tradeRegisterRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "NFT 판매 중단", notes = "판매페이지에 있던 NFT를 판매 중단한다.")
    @PostMapping("/stop")
    public ResponseEntity<TradeRegisterRequest> stopNft(
            @RequestBody @ApiParam(value = "판매 취소를 위한 판매자, NFT 정보", required = true) TradeStopRequest tradeStopRequest){
        tradeService.stopNft(tradeStopRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
