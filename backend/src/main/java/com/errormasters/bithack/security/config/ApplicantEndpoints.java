package com.errormasters.bithack.security.config;

public enum ApplicantEndpoints {
    GET (),
    POST (),
    DELETE ();

    private final String[] endpoints;

    ApplicantEndpoints(String... endpoints) {
        this.endpoints = endpoints;
    }

    public String[] getEndpoints() {
        return endpoints;
    }
}
