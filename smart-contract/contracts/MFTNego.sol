pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./MFT.sol";

/**
* MFT 제안정보를 보관하는 컨트랙트
* 
* @author 황승주
* @since 2022. 09. 17.
*/

contract MFTNego is Ownable, IERC721Receiver {
    using SafeMath for uint256;

    // 제안한 Sale 컨트랙트 주소
    address private _saleAddr;
    // 제안자 지갑 주소
    address private _negoer;
    // 제안 가격
    uint256 private _price;
    // 제안 일시
    uint256 private _negoedAt;
    // 채택 여부
    bool private choiced;
    // 취소 여부
    bool private canclled;
}