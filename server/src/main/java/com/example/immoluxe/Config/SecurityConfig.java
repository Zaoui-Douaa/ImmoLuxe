package com.example.immoluxe.Config;

import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig  {
    //private  final  JwtAuthenticationFilter jwtAuthFilter;
    //private final  AuthenticationProvider authenticationProvider;

    /*
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeRequests()
                .requestMatchers("/api/v1/auth/**","/api/v1/demo-controller" , "/api/v1/contrat")
                .permitAll()
                .anyRequest()
                .authenticated())
        .oauth2ResourceServer()




        return http.build();
    }
    */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(
                                        "/api/v1/auth/**","/api/v1/demo-controller" , "/api/v1/*"
                                )
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                )
                .oauth2ResourceServer(auth->auth.jwt(token->token.jwtAuthenticationConverter(new KeyCloakJwtAuthenticationConverter()))) ;


    return http.build();
}
}
