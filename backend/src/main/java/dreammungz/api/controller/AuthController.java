package dreammungz.api.controller;

import dreammungz.api.dto.auth.AuthResponse;
import dreammungz.api.dto.auth.JwtResponse;
import dreammungz.api.dto.auth.SignatureRequest;
import dreammungz.api.dto.common.BasicResponse;
import dreammungz.api.service.AuthService;
import dreammungz.config.jwt.JwtService;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SignatureException;

/*
@author 황승주
@since 2022. 09. 11.
*/

@RestController
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    final AuthService authService;
    final JwtService jwtService;

    static final String SUCCESS = "success";

    @ApiOperation(value = "nonce 조회", notes = "지갑 주소로 회원의 nonce를 조회한다.", response = AuthResponse.class)
    @GetMapping("/info/{address}")
    public ResponseEntity<BasicResponse<AuthResponse>> memberNonce(
            @ApiParam(value = "지갑 주소")
            @PathVariable(value = "address")
            String address) {
        AuthResponse authResponse = authService.getMemberNonce(address);
        return new ResponseEntity<>(toBasicResponse(SUCCESS, authResponse), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 가입", notes = "지갑 주소로 가입하고 nonce를 조회한다.", response = AuthResponse.class)
    @PostMapping("/signin")
    public ResponseEntity<BasicResponse<AuthResponse>> memberSignIn(
            @ApiParam(value = "지갑 주소")
            @RequestParam(value = "address")
            String address) {
        if (authService.getMemberExists(address)) {
            throw new CustomException(CustomExceptionList.ADDRESS_DUPLICATED);
        }
        AuthResponse authResponse = authService.memberSignIn(address);
        return new ResponseEntity<>(toBasicResponse(SUCCESS, authResponse), HttpStatus.OK);
    }

    @ApiOperation(value = "서명 인증", notes = "metamask에서 받은 서명으로 로그인 한다.", response = JwtResponse.class)
    @PostMapping("/signature")
    public ResponseEntity<BasicResponse<JwtResponse>> signatureAuthentication(
            @RequestBody SignatureRequest signatureRequest) throws SignatureException {
        String address = signatureRequest.getAddress();
        String signature = signatureRequest.getSignature();

        boolean verified = authService.verifySignature(address, signature);

        if (verified) {
            JwtResponse jwtResponse = new JwtResponse();

            String token = jwtService.generateToken(address).getAccessToken();
            String expiration = jwtService.dateToString(token);

            jwtResponse.setToken(token);
            jwtResponse.setExpiration(expiration);

            authService.changeNonce(address);

            return new ResponseEntity<>(toBasicResponse(SUCCESS, jwtResponse), HttpStatus.OK);
        } else {
            throw new CustomException(CustomExceptionList.SIGNATURE_INVALID);
        }
    }

    private <T> BasicResponse<T> toBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
