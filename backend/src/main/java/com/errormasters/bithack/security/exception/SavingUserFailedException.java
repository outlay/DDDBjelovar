package com.errormasters.bithack.security.exception;

import com.errormasters.bithack.common.exception.BithackException;
import org.springframework.http.HttpStatusCode;

public class SavingUserFailedException extends BithackException {

    public SavingUserFailedException(HttpStatusCode statusCode, String message) {
        super(statusCode, message);
    }

    public SavingUserFailedException(HttpStatusCode statusCode, String message, Throwable cause) {
        super(statusCode, message, cause);
    }
}
