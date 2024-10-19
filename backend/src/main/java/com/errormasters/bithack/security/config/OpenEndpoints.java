package com.errormasters.bithack.security.config;

import static com.errormasters.bithack.common.Constants.Api.*;

public enum OpenEndpoints {

    GET (
            V1 + HOUSES,
            "/swagger-ui/**",
            "/favicon.ico",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/actuator/**"
    ),

    POST (
            V1 + USERS,
            V1 + USERS + LOGIN
    );

    private final String[] endpoints;

    OpenEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
