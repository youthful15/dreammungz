package dreammungz.api.dto.common;

import lombok.Builder;
import lombok.Getter;

/*
@author 황승주
@since 2022. 09. 11.
*/

@Getter
public class BasicResponse<Type> {
    private String message;
    private Type data;

    @Builder
    public BasicResponse(String message, Type data) {
        this.message = message;
        this.data = data;
    }
}