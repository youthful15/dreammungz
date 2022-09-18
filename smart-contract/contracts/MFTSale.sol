pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./SSFToken.sol";
import "./MFT.sol";
import "./MFTNego.sol";

/**
* MFT 거래정보를 보관하고 해당 거래의 제안정보를 관리하는 컨트랙트
* 
* @author 황승주
* @since 2022. 09. 17.
*/

contract MFTSale is Ownable, IERC721Receiver {
    using SafeMath for uint256;

    // 판매하는 MFT ID
    uint256 private _MFTId;
    // 판매자의 지갑 주소
    address private _seller;
    // 구매자의 지갑 주소
    address private _buyer;
    // 즉시 구매 금액
    uint256 private _buyNowPrice;
    // 최종 거래 금액
    uint256 private _finalPrice;
    // 판매 시작 시간
    uint256 private _startedAt;
    // 판매 종료 시간
    uint256 private _endedAt;
    // 판매 종료 여부
    bool private _isEnded;
    // 판매 취소 여부
    bool private _isCanceled;
    // 제안 가능 여부
    bool private _negoAble;
    // 제안 컨트랙트 주소
    mapping(uint256 => address) private negoAddrs;

    // SSAFY 토큰(SSF) 활용을 위한 ERC-20 토큰 컨트랙트
    SSFToken private _SSFTokenContract;
    // MFT 활용을 위한 ERC-721 토큰 컨트랙트
    MFT private _MFTContract;

    /**
    * constructor
    * 새로운 Sale 컨트랙트 생성
    * 
    * @ param uint256 MFTId MFT ID
    * @ param address seller 판매자
    * @ param uint256 buyNowPrice 즉시 구매 금액
    * @ param uint256 startedAt 판매 시작 시간
    * @ param uint256 endedAt 판매 종료 시간
    * @ param bool negoAble 제안 가능 여부 
    * @ param address SSFTokenContractAddress SSAFY 토큰(ERC-20) 컨트랙트 주소
    * @ param address MFTContractAddress MFT(ERC-721) 컨트랙트 주소
    * @ return None
    * @ exception 즉시 구매 금액은 0 이상이어야 함
    * @ exception 판매 종료 시간이 판매 시작 시간보다 늦어야 함
    */
    constructor(
        uint256 MFTId, 
        address seller, 
        uint256 buyNowPrice, 
        uint256 startedAt, 
        uint256 endedAt, 
        bool negoAble,
        address SSFTokenContractAddress,
        address MFTContractAddress
    ) {
        require(buyNowPrice >= 0, "Price must be higher than 0.");
        require(startedAt < endedAt, "Endtime must be later than starttime.");

        _MFTId = MFTId;
        _seller = seller;
        _buyNowPrice = buyNowPrice;
        _startedAt = startedAt;
        _endedAt = endedAt;
        _negoAble = negoAble;
        _SSFTokenContract = SSFToken(SSFTokenContractAddress);
        _MFTContract = MFT(MFTContractAddress);
    }

    /**
    * reportNego
    * 생성된 Nego 컨트랙트를 해당 Sale에 기록
    * 
    * @ param address negoAddr 제안 컨트랙트 주소
    * @ param address negoer 제안자 지갑 주소
    * @ param uint256 negoPrice 제안 금액
    * @ param uint256 negoAt 제안 일시
    * @ param bool isChoiced 제안 채택 여부
    * @ param bool isCanceled 제안 취소 여부
    * @ return None
    * @ exception 제안 금액은 0 이상이어야 함
    * @ exception 제안 하는 Sale은 진행중이어야 함
    */
    function reportNego(
        address negoAddr,
        address negoer,
        uint256 negoPrice,
        uint256 negoAt,
        bool isChoiced,
        bool isCanceled
    ) public {
        require(negoPrice >= 0, "Price must be higher than 0.");
        require(negoAt < endedAt, "This sale is already ended.");


    }

    /**
    * getEndTimeLeft
    * Sale 종료까지 남은 시간을 반환
    *
    * @ param None
    * @ return uint256 Sale 종료까지 남은 시간
    * @ exception None
    */
    function getEndTimeLeft() public view returns(uint256) {
        require(_endedAt > block.timestamp, "This sale is already ended.");
        return _endedAt - block.timestamp;
    }

    /**
    * getMFTId
    * 해당 Sale의 대상 MFT ID를 반환
    *
    * @ param None
    * @ return uint256 MFT ID
    * @ exception None
    */
    function getMFTId() public view returns(uint256) {
        return _MFTId;
    }

    /**
    * getSeller
    * 해당 Sale의 판매자 지갑 주소를 반환
    *
    * @ param None
    * @ return address 판매자 지갑 주소
    * @ exception None
    */
    function getSeller() public view returns(address) {
        return _seller;
    }

    /**
    * getBuyer
    * 해당 Sale의 구매자 지갑 주소를 반환
    *
    * @ param None
    * @ return address 구매자 지갑 주소
    * @ exception None
    */
    function getBuyer() public view returns(address) {
        return _buyer;
    }

    /**
    * getBuyNowPrice
    * 해당 Sale의 즉시 구매 금액을 반환
    *
    * @ param None
    * @ return uint256 즉시 구매 금액
    * @ exception None
    */
    function getBuyNowPrice() public view returns(uint256) {
        return _buyNowPrice;
    }

    /**
    * getFinalPrice
    * 해당 Sale의 최종 거래 금액을 반환
    *
    * @ param None
    * @ return uint256 최종 거래 금액
    * @ exception None
    */
    function getFinalPrice() public view returns(uint256) {
        return _finalPrice;
    }

    /**
    * getStartedAt
    * 해당 Sale의 판매 시작 시간을 반환
    *
    * @ param None
    * @ return uint256 판매 시작 시간
    * @ exception None
    */
    function getStartedAt() public view returns(uint256) {
        return _startedAt;
    }

    /**
    * getEndedAt
    * 해당 Sale의 판매 종료 시간을 반환
    *
    * @ param None
    * @ return uint256 판매 종료 시간
    * @ exception None
    */
    function getEndedAt() public view returns(uint256) {
        return _endedAt;
    }

    /**
    * getIsEnded
    * 해당 Sale의 종료 여부를 반환
    *
    * @ param None
    * @ return bool Sale 종료 여부
    * @ exception None
    */
    function getIsEnded() public view returns(bool) {
        return _isEnded;
    }

        /**
    * getIsCanceled
    * 해당 Sale의 취소 여부를 반환
    *
    * @ param None
    * @ return bool Sale 취소 여부
    * @ exception None
    */
    function getIsCanceled() public view returns(bool) {
        return _isCanceled;
    }

        /**
    * getNegoAble
    * 해당 Sale의 제안 가능 여부를 반환
    *
    * @ param None
    * @ return bool 제안 가능 여부
    * @ exception None
    */
    function getNegoAble() public view returns(bool) {
        return _negoAble;
    }

    /**
    * getNegoAddrs
    * 해당 Sale의 제안 컨트랙트 주소 목록을 반환
    *
    * @ param None
    * @ return uint256[] 제안 컨트랙트 목록
    * @ exception None
    */
    function getNegoAddrs() public view returns(uint256[] memory) {
        return _negoAddrs;
    }
}   