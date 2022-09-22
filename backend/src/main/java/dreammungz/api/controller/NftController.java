package dreammungz.api.controller;

import dreammungz.api.dto.nft.info.GameEndRequest;
import dreammungz.api.dto.nft.info.GameEndResponse;
import dreammungz.api.dto.nft.list.NftListRequest;
import dreammungz.api.dto.nft.list.NftListResponse;
import dreammungz.api.service.NftService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

    /*
    @author 신슬기
    @since 2022. 09. 15.
    */

@RestController
@RequestMapping("/nft")
@RequiredArgsConstructor
public class NftController {
    private final NftService nftService;

    @ApiOperation(value = "NFT 리스트 조회", notes = "NFT 리스트를 조회한다.")
    @PostMapping("/list")
    public ResponseEntity<NftListResponse> searchNft(@ApiParam(value = "NFT 필터 정보") @RequestBody NftListRequest nftListRequest) {
        NftListResponse response = nftService.searchNft(nftListRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @ApiOperation(value = "엔딩 결과 조회", notes = "지갑 주소에 있는 게임 데이터를 조회해 엔딩 결과를 생성한다.", response = GameEndResponse.class)
    @GetMapping("/result/address/{address}")
    public ResponseEntity<GameEndResponse> makeEnd(@ApiParam(value = "지갑 주소", required = true) @PathVariable String address) {
        GameEndResponse response = nftService.makeEnd(address);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "NFT 정보 저장", notes = "NFT 정보를 저장한다.")
    @PostMapping("/result/address/{address}")
    public ResponseEntity<GameEndRequest> saveNft(@ApiParam(value = "NFT 정보", required = true) @RequestBody GameEndRequest gameEndRequest, @ApiParam(value = "지갑 주소", required = true) @PathVariable String address) {
        nftService.saveNft(address, gameEndRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
