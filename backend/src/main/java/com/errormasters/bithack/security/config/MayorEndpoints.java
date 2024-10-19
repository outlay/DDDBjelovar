package com.errormasters.bithack.security.config;

public enum MayorEndpoints {
    GET (),
    POST (),
    DELETE ();

    private final String[] endpoints;

    MayorEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
