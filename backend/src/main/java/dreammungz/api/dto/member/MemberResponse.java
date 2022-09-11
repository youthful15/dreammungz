package dreammungz.api.dto.member;

import lombok.Getter;
import lombok.Setter;

/*
@author 황승주
@since 2022. 09. 11.
*/

@Getter
@Setter
public class MemberResponse {
    private String address;
    private String nickname;
    private String repIcon;
    private String playing;
}
