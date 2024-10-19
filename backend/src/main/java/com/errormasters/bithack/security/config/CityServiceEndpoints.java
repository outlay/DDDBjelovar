package com.errormasters.bithack.security.config;

import static com.errormasters.bithack.common.Constants.Api.*;

public enum CityServiceEndpoints {
    GET (
            V1 + RESERVATIONS_BY_USER,
            V1 + RESERVATIONS + "/*"
    ),
    POST (),
    DELETE ();

    private final String[] endpoints;

    CityServiceEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
