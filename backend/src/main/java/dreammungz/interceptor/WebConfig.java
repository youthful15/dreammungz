package dreammungz.interceptor;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
@author 황승주
@since 2022. 09. 30.
*/

@Configuration
//@EnableWebMvc
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthInterceptor authInterceptor;
    private final WalletInterceptor walletInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {

//        적용 시 주석 해제 예정
//        interceptorRegistry.addInterceptor(walletInterceptor)
//                .addPathPatterns("/info/{address}", "/result/address/{address}");

    }
}

