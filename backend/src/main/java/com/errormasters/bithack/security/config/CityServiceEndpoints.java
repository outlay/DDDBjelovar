package com.errormasters.bithack.security.config;

public enum CityServiceEndpoints {
    GET (),
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
