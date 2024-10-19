package com.errormasters.bithack.security.config;

import com.errormasters.bithack.security.jwt.AuthEntryPointJwt;
import com.errormasters.bithack.security.jwt.AuthTokenFilter;
import com.errormasters.bithack.security.service.DashboardUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    private final DashboardUserDetailsService userDetailsService;

    private final AuthEntryPointJwt unauthorizedHandler;

    // Constructor-based dependency injection
    public WebSecurityConfig(DashboardUserDetailsService userDetailsService, AuthEntryPointJwt unauthorizedHandler) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
    }

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors((cors) -> {
                    cors.configurationSource((request) -> {
                        var corsConfiguration = new org.springframework.web.cors.CorsConfiguration();
                        corsConfiguration.setAllowedOrigins(java.util.List.of("*"));
                        corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
                        corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
                        return corsConfiguration;
                    });
                })
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .requestMatchers(HttpMethod.GET, OpenEndpoints.GET.getEndpoints()).permitAll()
                                .requestMatchers(HttpMethod.POST, OpenEndpoints.POST.getEndpoints()).permitAll()
                                .requestMatchers(HttpMethod.GET, ApplicantEndpoints.GET.getEndpoints()).hasAnyAuthority("ROLE_APPLICANT")
                                .requestMatchers(HttpMethod.POST, ApplicantEndpoints.POST.getEndpoints()).hasAnyAuthority("ROLE_APPLICANT")
                                .requestMatchers(HttpMethod.DELETE, ApplicantEndpoints.DELETE.getEndpoints()).hasAnyAuthority("ROLE_APPLICANT")
                                .requestMatchers(HttpMethod.GET, CityServiceEndpoints.GET.getEndpoints()).hasAnyAuthority("ROLE_CITY_SERVICE")
                                .requestMatchers(HttpMethod.POST, CityServiceEndpoints.POST.getEndpoints()).hasAnyAuthority("ROLE_CITY_SERVICE")
                                .requestMatchers(HttpMethod.DELETE, CityServiceEndpoints.DELETE.getEndpoints()).hasAnyAuthority("ROLE_CITY_SERVICE")
                                .requestMatchers(HttpMethod.GET, JanitorEndpoints.GET.getEndpoints()).hasAnyAuthority("ROLE_JANITOR")
                                .requestMatchers(HttpMethod.POST, JanitorEndpoints.POST.getEndpoints()).hasAnyAuthority("ROLE_JANITOR")
                                .requestMatchers(HttpMethod.DELETE, JanitorEndpoints.DELETE.getEndpoints()).hasAnyAuthority("ROLE_JANITOR")
                                .requestMatchers(HttpMethod.GET, MayorEndpoints.GET.getEndpoints()).hasAnyAuthority("ROLE_MAYOR")
                                .requestMatchers(HttpMethod.POST, MayorEndpoints.POST.getEndpoints()).hasAnyAuthority("ROLE_MAYOR")
                                .requestMatchers(HttpMethod.DELETE, MayorEndpoints.DELETE.getEndpoints()).hasAnyAuthority("ROLE_MAYOR")
                                .anyRequest().authenticated()
                );

        http.authenticationProvider(authenticationProvider());
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
