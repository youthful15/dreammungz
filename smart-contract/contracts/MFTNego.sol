pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./MFT.sol";
import "./MFTSale.sol";

/**
* MFT 제안정보를 보관하는 컨트랙트
* 
* @author 황승주
* @since 2022. 09. 18.
*/

contract MFTNego is Ownable, IERC721Receiver {
    using SafeMath for uint256;

    // 제안한 Sale 컨트랙트 주소
    address private _saleAddr;
    // 제안자 지갑 주소
    address private _negoer;
    // 제안 가격
    uint256 private _negoPrice;
    // 제안 일시
    uint256 private _negoedAt;
    // 채택 여부
    bool private _isChoiced;
    // 취소 여부
    bool private _isCanceled;

    /**
    * constructor
    * 새로운 Nego 컨트랙트 생성
    * 
    * @ param address saleAddr 제안한 Sale 컨트랙트 주소
    * @ param address negoer 제안자 지갑 주소
    * @ param uint256 negoPrice 제안 가격
    * @ param uint256 negoedAt 제안 일시
    * @ param bool isChoiced 채택 여부
    * @ param bool isCanceled 취소 여부
    * @ return None
    * @ exception 제안 금액은 0 이상이어야 함
    * @ exception 제안 하는 Sale은 진행중이어야 함
    */
    constructor(
        uint256 saleAddr,
        address negoer,
        uint256 negoPrice,
        uint256 negoAt,
        bool isChoiced,
        bool isCanceled
    ) {
    require(buyNowPrice >= 0, "Price must be higher than 0.");
    require(negoAt < Sale(_saleAddrs[saleId]).getEndedAt, "This sale is already ended.");

        _saleAddr = saleAddr;
        _negoer = negoer;
        _negoPrice = negoPrice;
        _negoAt = negoAt;
        _isChoiced = isChoiced;
        _isCanceled = isCanceled;
    }

    /**
    * getSaleAddr
    * 해당 Nego가 발생한 Sale 컨트랙트 주소
    *
    * @ param None
    * @ return address Sale 컨트랙트 주소
    * @ exception None
    */
    function getSaleAddr() public view returns(address) {
        return _saleAddr;
    }

    /**
    * getNegoer
    * 해당 Nego의 제안자 지갑 주소를 반환
    *
    * @ param None
    * @ return address negoer
    * @ exception None
    */
    function getNegoer() public view returns(address) {
        return _negoer;
    }

    /**
    * getNegoPrice
    * 해당 Nego의 제안 금액 반환
    *
    * @ param None
    * @ return uint256 제안 금액
    * @ exception None
    */
    function getNegoPrice() public view returns(uint256) {
        return _negoPrice;
    }

    /**
    * getNegoAt
    * 해당 Nego의 제안 일시 반환
    *
    * @ param None
    * @ return uint256 제안 일시
    * @ exception None
    */
    function getNegoAt() public view returns(uint256) {
        return _negoAt;
    }

    /**
    * getIsChoiced
    * 해당 Nego의 채택 여부 반환
    *
    * @ param None
    * @ return bool 채택 여부
    * @ exception None
    */
    function getIsChoiced() public view returns(bool) {
        return _isChoiced;
    }

    /**
    * getIsCanceled
    * 해당 Nego의 취소 여부 반환
    *
    * @ param None
    * @ return bool 취소 여부
    * @ exception None
    */
    function getCanceled() public view returns(bool) {
        return _isCanceled;
    }
}