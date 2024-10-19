package com.errormasters.bithack.common.exception;

import com.errormasters.bithack.config.error.FieldError;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

/**
 * This exception should be thrown by custom validation annotations when the validation fails
 * Or when the custom validation in other layers fails
 */
@Getter
public class ValidationException extends BithackException {
    private static final HttpStatusCode STATUS_CODE = HttpStatus.BAD_REQUEST;
    @NotNull
    private final FieldError fieldError;

    public ValidationException(String message, Throwable cause, FieldError fieldError) {
        super(STATUS_CODE, message, cause);
        this.fieldError = fieldError;
    }

    public ValidationException(String message, FieldError fieldError) {
        super(STATUS_CODE, message);
        this.fieldError = fieldError;
    }
}
