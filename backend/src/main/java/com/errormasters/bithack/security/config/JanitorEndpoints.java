package com.errormasters.bithack.security.config;

public enum JanitorEndpoints {
    GET (),
    POST (),
    DELETE ();

    private final String[] endpoints;

    JanitorEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
