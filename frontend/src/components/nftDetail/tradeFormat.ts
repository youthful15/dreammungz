import {
  MFTContract,
  MFTSaleFactoryContractAddress,
  MFTSaleFactoryContract,
  MUNGContract,
  web3,
} from "../../utils/Web3Config"
import { http } from "../../api/axios"

// NFT 판매 등록 -------------------------------------------------------------------------
export const sellFormat = async ({
  publicAddress,
  negoAble,
  tokenId,
  buyNowPrice,
}: {
  publicAddress: string
  negoAble: boolean
  tokenId: number
  buyNowPrice: any
}) => {
  // 판매 Smart Contract
  try {
    // 권한 부여
    MFTContract.methods
      .setApprovalForAll(MFTSaleFactoryContractAddress, true)
      .send({ from: publicAddress })

    await MFTSaleFactoryContract.methods
      .createSale(tokenId, publicAddress, buyNowPrice, negoAble)
      .send({ from: publicAddress })
      .then((res: any) => {
        console.log("판매등록", res)
      })

    const contractId = await MFTSaleFactoryContract.methods
      .getCurrentSaleOfMFT(tokenId)
      .call()
    console.log(contractId)
    await http
      .post(`trade/nftRegister`, {
        address: publicAddress,
        contractId: contractId,
        negoAble: negoAble,
        price: buyNowPrice,
        tokenId: tokenId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  } catch (err) {
    console.error("판매 등록 에러", err)
  }
}

// NFT 판매 중단 -------------------------------------------------------------------------
export const sellAbortFormat = async ({
  tokenId,
  publicAddress,
}: {
  tokenId: number
  publicAddress: string
}) => {
  try {
    const saleContractId = await MFTSaleFactoryContract.methods
      .getCurrentSaleOfMFT(tokenId)
      .call()

    await MFTSaleFactoryContract.methods
      .cancelSale(saleContractId)
      .send({ from: publicAddress })

    await http
      .put("trade/nftStop", {
        address: publicAddress,
        contractId: saleContractId,
        tokenId: tokenId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  } catch (err) {
    console.log(err)
  }
}

// NFT 즉시 구매 -------------------------------------------------------------------------
export const buyNowFormat = async ({
  balance,
  cost,
  tokenId,
  publicAddress,
}: {
  balance: any
  cost: any
  tokenId: number
  publicAddress: string
}) => {
  // 금액이 부족할때
  if (balance < cost) {
    await alert("M이 부족합니다!")
  }

  // 금액이 충분할때
  else {
    try {
      // contractId 받기
      const saleContractId = await MFTSaleFactoryContract.methods
        .getCurrentSaleOfMFT(tokenId)
        .call()

      // 주소
      const saleContractAddress = await MFTSaleFactoryContract.methods
        .getSale(saleContractId)
        .call()
      console.log("SaleContractAddress", saleContractAddress)
      // approve 필요 10 ** 18 곱하기
      await MUNGContract.methods
        // web3.utils.toBN(cost)
        .approve(
          saleContractAddress,
          web3.utils.toBN(cost * 10 ** 18).toString()
        )
        .send({ from: publicAddress })

      // 즉시 구매 SMART CONTRACT
      await MFTSaleFactoryContract.methods
        .buyNow(saleContractId, publicAddress)
        .send({ from: publicAddress })

      await http
        .post("trade/nftPurchase", {
          address: publicAddress,
          contractId: parseInt(saleContractId),
          tokenId: tokenId,
        })
        .then((res) => console.log("즉시구매", res))
        .catch((err) => console.error(err))
    } catch (err) {
      console.error(err)
    }

    alert("구매 하는 중입니다.")
    // setIsSelling(false)
    // navigate("/nft/list") // 즉시 구매시 nft list page로 redirect
  }
}

// NFT 네고 제안 수락 -------------------------------------------------------------------------
export const acceptNegoFormat = async ({
  tokenId,
  negoId,
  publicAddress,
}: {
  tokenId: number
  negoId: number
  publicAddress: string
}) => {
  try {
    // contractId 받기
    const saleContractId = await MFTSaleFactoryContract.methods
      .getCurrentSaleOfMFT(tokenId)
      .call()

    // 판매자 입장 -> negoId 받을 예정
    // NFT 네고 제안 수락 SMARTCONTRACT
    await MFTSaleFactoryContract.methods
      .acceptNego(saleContractId, negoId)
      .send({ from: publicAddress })

    // NFT 네고 제안 수락 REST API
    await http
      .post("trade/offerAccept", {
        contractId: saleContractId,
        tokenId: tokenId,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err))
  } catch (err) {
    console.error(err)
  }
}

// NFT 네고 제안 취소 -------------------------------------------------------------------------
// Nego Contract Id를 Offer List에서 Item 클릭시 해당 Item의 NegoId를 사용할 수 있어야 함
export const cancelNegoFormat = async ({
  clickedNegoId,
  publicAddress,
  tokenId,
}: {
  clickedNegoId: number
  publicAddress: string
  tokenId: number
}) => {
  // approve 필요 없음
  // MFTContract.methods.approve()

  try {
    // SMART CONTRACT
    await MFTSaleFactoryContract.methods
      .cancelNego(clickedNegoId)
      .send({ from: publicAddress })

    // RESTAPI
    await http.put("trade/offerCancel", {
      address: publicAddress,
      contractId: clickedNegoId,
      tokenId: tokenId,
    })

    alert("제안이 취소되었습니다.")
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요 여기에
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
    // OFFERLIST 초기화 필요
  } catch (err) {
    console.error(err)
  }
}
