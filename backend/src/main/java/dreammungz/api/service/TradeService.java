package dreammungz.api.service;

import dreammungz.api.dto.trade.TradeRegisterRequest;
import dreammungz.api.dto.trade.TradeStopRequest;
import dreammungz.db.entity.Member;
import dreammungz.db.entity.Negotiation;
import dreammungz.db.entity.Seller;
import dreammungz.db.entity.Trade;
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
        System.out.println("HELLO1");
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
        System.out.println("HELLO2");
        tradeRepository.save(trade);
    }

    public void stopNft(TradeStopRequest tradeStopRequest){
        Member member = getMember(tradeStopRequest.getAddress());

        //nft id가 같고 거래상태(state)가 proceeding인 것을 찾는다.
        List<Trade> tradeList = tradeRepository.findAllByNftId(nftRepository.findNftByTokenId(tradeStopRequest.getTokenId()).get().getId());
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

    public Member getMember(String address){
        return memberRepository.findByAddress(address).orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));
    }
}
