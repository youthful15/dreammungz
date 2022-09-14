package dreammungz.api.service;

import dreammungz.api.dto.auth.AuthResponse;
import dreammungz.db.entity.Member;
import dreammungz.db.repository.MemberRepository;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import javax.transaction.Transactional;
import java.security.SignatureException;

/*
@author 황승주
@since 2022. 09. 11.
*/

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    final MemberRepository memberRepository;

    public Boolean getMemberExists(String address) {
        return memberRepository.existsByAddress(address);
    }

    public AuthResponse getMemberNonce(String address) {
        AuthResponse authResponse = new AuthResponse();
        Member member = memberRepository.findByAddress(address)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        authResponse.setAddress(member.getAddress());
        authResponse.setNonce(member.getNonce().toString());

        return authResponse;
    }

    public AuthResponse memberSignIn(String address) {
        Member member = Member.builder()
                .address(address)
                .build();

        memberRepository.save(member);

        AuthResponse authResponse = new AuthResponse();

        authResponse.setAddress(member.getAddress());
        authResponse.setNonce(member.getNonce().toString());
        return authResponse;
    }

    public boolean verifySignature(String address, String signature) throws SignatureException {
        Member member = memberRepository.findByAddress(address)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        String nonce = member.getNonce().toString();

        String decryptedAddress = getAddressUsedToSignHashedPrefixedMessage(signature, nonce);
        decryptedAddress = "0x" + decryptedAddress;

        return address.equalsIgnoreCase(decryptedAddress);
    }

    private static String getAddressUsedToSignHashedPrefixedMessage(String signature, String nonce) throws SignatureException {
        String r = signature.substring(0, 66);
        String s = "0x" + signature.substring(66, 130);
        String v = "0x" + signature.substring(130, 132);

        String publicKey = Sign.signedPrefixedMessageToKey(
                        nonce.getBytes(),
                        new Sign.SignatureData(
                                Numeric.hexStringToByteArray(v)[0],
                                Numeric.hexStringToByteArray(r),
                                Numeric.hexStringToByteArray(s))
                )
                .toString(16);

        return Keys.getAddress(publicKey);
    }

    public void changeNonce(String address) {
        Member member = memberRepository.findByAddress(address)
                .orElseThrow(() -> new CustomException(CustomExceptionList.MEMBER_NOT_FOUND));

        member.createNonce();
    }
}
