package dreammungz.api.service;

import dreammungz.api.dto.member.MemberResponse;
import dreammungz.db.entity.Member;
import dreammungz.db.repository.MemberRepository;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/*
@author 황승주
@since 2022. 09. 11.
*/

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    final MemberRepository memberRepository;

    public Boolean getMemberExists(String address) {
        return memberRepository.existsByAddress(address);
    }

    public MemberResponse getMemberInfo(String address) {
        MemberResponse memberResponse = new MemberResponse();
        Member member = memberRepository.findByAddress(address)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        memberResponse.setAddress(member.getAddress());
        memberResponse.setNickname(member.getNickname());
        memberResponse.setRepIcon(member.getRepIcon());
        memberResponse.setPlaying(member.getPlaying().toString());

        return memberResponse;
    }

    public MemberResponse signInMember(String address) {
        Member member = Member.builder()
                .address(address)
                .build();

        memberRepository.save(member);

        MemberResponse memberResponse = new MemberResponse();

        memberResponse.setAddress(member.getAddress());
        memberResponse.setNickname(member.getNickname());
        memberResponse.setRepIcon(member.getRepIcon());
        memberResponse.setPlaying(member.getPlaying().toString());

        return memberResponse;
    }
}
