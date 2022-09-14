package dreammungz.api.dto.auth;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignatureRequest {
    @ApiModelProperty(
            value = "회원의 지갑 주소",
            name = "address",
            dataType = "String")
    String address;

    @ApiModelProperty(
            value = "서명",
            name = "signature",
            dataType = "String")
    String signature;
}
