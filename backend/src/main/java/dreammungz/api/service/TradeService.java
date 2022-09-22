package dreammungz.api.service;

import dreammungz.api.dto.trade.*;
import dreammungz.db.entity.*;
import dreammungz.db.repository.*;
import dreammungz.enums.Check;
import dreammungz.enums.State;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TradeService {
    final MemberRepository memberRepository;
    final SellerRepository sellerRepository;
    final TradeRepository tradeRepository;
    final NegotiationRepository negotiationRepository;
    final NftRepository nftRepository;

    public void registerNft(TradeRegisterRequest tradeRegisterRequest){
        Member member = getMember(tradeRegisterRequest.getAddress());

        //Seller DB에 사용자 추가
        Seller seller = new Seller(member);
        sellerRepository.save(seller);
        //Trade DB에 사용 정보 추가
        Trade trade = new Trade(State.PROCEEDING,
                tradeRegisterRequest.isNegoAble()?Check.Y:Check.N,
                LocalDateTime.now(),
                tradeRegisterRequest.getPrice(),
                nftRepository.findNftByTokenId(tradeRegisterRequest.getTokenId()).get(),
                seller,
                Check.N,
                tradeRegisterRequest.getContractId()
                );
        tradeRepository.save(trade);
    }

    public void stopNft(TradeStopRequest tradeStopRequest){
        Member member = getMember(tradeStopRequest.getAddress());

        //nft id가 같고 거래상태(state)가 proceeding인 것을 찾는다.
        Trade trade = getTrade(tradeStopRequest.getTokenId(), member);
        //해당 거래를 cancel한다.
        trade.setCancel(Check.Y);
        tradeRepository.save(trade);

        //nego table의 모든 네고 요청을 cancel 한다.
        List<Negotiation> negotiations = negotiationRepository.findAllByTradeId(trade.getId());
        for(Negotiation negotiation : negotiations){
            negotiation.setCancel(Check.Y);
        }
        negotiationRepository.saveAll(negotiations);

    }

    public void purchaseNft(TradePurchaseRequest tradePurchaseRequest){
        Member member = getMember(tradePurchaseRequest.getAddress());
        //buyer 만들기
        Buyer buyer = new Buyer(member);

        //해당 거래를 trade 테이블에서 찾기
        Trade trade = getTrade(tradePurchaseRequest.getTokenId(), member);
        trade.setBuyer(buyer);  //buyer 추가
        trade.setEndTime(LocalDateTime.now());  // 종료시간 추가
        trade.setEndPrice(trade.getStartPrice());   // 최종거래금액 추가
        trade.setState(State.COMPLETE);// 거래상태 변경
        tradeRepository.save(trade);

        //nego table의 모든 네고 요청을 cancel 한다.
        List<Negotiation> negotiations = negotiationRepository.findAllByTradeId(trade.getId());
        for(Negotiation negotiation : negotiations){
            negotiation.setCancel(Check.Y);
        }
        negotiationRepository.saveAll(negotiations);

    }

    public void registerOffer(OfferRegisterRequest offerRegisterRequest){
        Member member = getMember(offerRegisterRequest.getAddress());
        //negotiation DB에 추가
        Negotiation negotiation = new Negotiation(
                offerRegisterRequest.getPrice(),
                LocalDateTime.now(),
                Check.N,
                getTrade(offerRegisterRequest.getTokenId(), member),   //tokenID를 바탕으로 nft->trade 아이디 추적
                member,
                Check.N,
                offerRegisterRequest.getContractId()
        );
        negotiationRepository.save(negotiation);
    }

    public void cancelOffer(OfferCancelRequest offerCancelRequest){
        Member member = getMember(offerCancelRequest.getAddress());
        //해당하는 negotiation 찾기
        Negotiation negotiation = negotiationRepository.findByContractId(offerCancelRequest.getContractId()).get();
        //negotiation DB 수정
        negotiation.setCancel(Check.Y);
        negotiationRepository.save(negotiation);
    }

    public void acceptOffer(OfferAcceptRequest offerAcceptRequest){
        //구매 제안자 찾기
        Negotiation negotiation = negotiationRepository.findByContractId(offerAcceptRequest.getContractId()).get();
        Member member = negotiation.getMember();
        //buyer 만들기
        Buyer buyer = new Buyer(member);

        //해당 거래를 trade 테이블에서 찾기
        Trade trade = negotiation.getTrade();
        trade.setBuyer(buyer);  //buyer 추가
        trade.setEndTime(LocalDateTime.now());  // 종료시간 추가
        trade.setEndPrice(negotiation.getPrice());   // 최종거래금액 추가
        trade.setState(State.COMPLETE);// 거래상태 변경
        tradeRepository.save(trade);

        //nego table의 모든 네고 요청을 cancel 한다.
        List<Negotiation> negotiations = negotiationRepository.findAllByTradeId(trade.getId());
        for(Negotiation negotiationTemp : negotiations){
            if(negotiationTemp == negotiation){
                negotiationTemp.setChoice(Check.Y); //수락된 네고는 수락되었음을 표시
            }
            else {
                negotiationTemp.setCancel(Check.Y); //다른 네고들은 취소되었음을 표시
            }
        }
        negotiationRepository.saveAll(negotiations);
    }
    public Member getMember(String address){
        return memberRepository.findByAddress(address).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
    }

    public Trade getTrade(Long tokenId, Member member){
        List<Trade> tradeList = tradeRepository.findAllByNftId(nftRepository.findNftByTokenId(tokenId).get().getId());
        Trade trade = null;
        for(Trade trades : tradeList){
            if(trades.getState() == State.PROCEEDING){
                trade = trades;
                break;
            }
        }
        if(trade == null){
            //ERROR1.NFT가 TRADE 명단에 없는 경우
            throw new CustomException(CustomExceptionList.NO_NFT_IN_TRADE);
        }
        else if(trade.getSeller().getMember() != member){
            //ERROR2. 현재 판매자 주소가 NFT 판매자가 아닌 경우
            throw new CustomException(CustomExceptionList.NOT_NFT_SELLER);
        }
        return trade;
    }
}
