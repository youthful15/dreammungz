package dreammungz.api.controller;

import dreammungz.api.dto.common.BasicResponse;
import dreammungz.api.dto.member.MemberResponse;
import dreammungz.api.service.MemberService;
import dreammungz.exception.CustomException;
import dreammungz.exception.CustomExceptionList;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/*
@author 황승주
@since 2022. 09. 11.
*/

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/member")
public class MemberController {

    final MemberService memberService;
    static final String SUCCESS = "success";

    @ApiOperation(value = "회원 조회", notes = "지갑 주소로 회원의 정보를 조회한다.", response = MemberResponse.class)
    @GetMapping("/info/{address}")
    public ResponseEntity<BasicResponse<MemberResponse>> memberInfo(
            @ApiParam(value = "지갑 주소")
            @PathVariable(value = "address")
            String address) {
        MemberResponse memberResponse = memberService.getMemberInfo(address);
        return new ResponseEntity<>(toBasicResponse(SUCCESS, memberResponse), HttpStatus.OK);
    }

    @ApiOperation(value = "회원 가입", notes = "지갑 주소로 가입한다.", response = MemberResponse.class)
    @PostMapping("/signin")
    public ResponseEntity<BasicResponse<MemberResponse>> memberSignIn(
            @ApiParam(value = "지갑 주소")
            @RequestParam(value = "address")
            String address) {
        if(memberService.getMemberExists(address)) {
            throw new CustomException(CustomExceptionList.ADDRESS_DUPLICATED);
        }
        MemberResponse memberResponse = memberService.signInMember(address);
        return new ResponseEntity<>(toBasicResponse(SUCCESS, memberResponse), HttpStatus.OK);
    }


    private <T> BasicResponse<T> toBasicResponse(String message, T data) {
        return BasicResponse.<T>builder()
                .message(message)
                .data(data)
                .build();
    }
}
