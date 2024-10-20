package com.errormasters.bithack.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class BithackException extends RuntimeException {
    private final HttpStatusCode statusCode;

    public BithackException(HttpStatusCode statusCode, String message) {
        super(message);
        this.statusCode = statusCode;
    }

    public BithackException(HttpStatusCode statusCode, String message, Throwable cause) {
        super(message, cause);
        this.statusCode = statusCode;
    }
}
