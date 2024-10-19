package com.errormasters.bithack.security.exception;

import com.errormasters.bithack.common.exception.BithackException;
import org.springframework.http.HttpStatus;

public class UserAlreadyExistsException extends BithackException {

    public UserAlreadyExistsException(String message, Throwable cause) {
        super(HttpStatus.CONFLICT, message, cause);
    }

    public UserAlreadyExistsException(String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
