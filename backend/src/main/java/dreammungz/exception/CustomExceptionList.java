package dreammungz.exception;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

/*
@author 황승주
@since 2022. 09. 08.
*/


@Getter
@ToString
public enum CustomExceptionList {

    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "E001", "잘못된 요청입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "E002", "서버 오류 입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "E003", "존재하지 않는 회원입니다."),
    ADDRESS_DUPLICATED(HttpStatus.FORBIDDEN, "E004", "이미 가입된 지갑 주소입니다."),
    SIGNATURE_INVALID(HttpStatus.UNAUTHORIZED, "E005", "서명이 유효하지 않습니다."),
    GAME_NOT_FOUND(HttpStatus.NOT_FOUND,"E006","게임 데이터가 없습니다."),
    JOB_NOT_FOUND(HttpStatus.NOT_FOUND,"E007","직업 정보가 없습니다."),
    GAMESTATUS_NOT_FOUND(HttpStatus.NOT_FOUND,"E008","게임 스탯 수치 정보가 없습니다."),
    STATUS_NOT_FOUND(HttpStatus.NOT_FOUND,"E009","스탯 정보가 없습니다."),
    NFT_NOT_FOUND(HttpStatus.NOT_FOUND,"E010","NFT 정보가 없습니다."),
    MATING_PARENT_GENDER_NOT_CORRECT(HttpStatus.NOT_FOUND, "E101", "성별이 일치하지 않는 부모 강아지가 존재합니다.");


    private final HttpStatus status;
    private final String code;
    private String message;

    CustomExceptionList(HttpStatus status, String code) {
        this.status = status;
        this.code = code;
    }

    CustomExceptionList(HttpStatus status, String code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
}
