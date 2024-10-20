package com.errormasters.bithack.security.config;

import static com.errormasters.bithack.common.Constants.Api.*;

public enum MayorEndpoints {
    GET (
            V1 + RESERVATIONS_BY_USER,
            V1 + RESERVATIONS + "/*"
    ),
    POST (
            V1 + RESERVATIONS
    ),
    DELETE ();

    private final String[] endpoints;

    MayorEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
