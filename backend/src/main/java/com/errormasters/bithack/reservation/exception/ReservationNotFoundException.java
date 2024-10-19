package com.errormasters.bithack.reservation.exception;

import com.errormasters.bithack.common.exception.BithackException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ReservationNotFoundException extends BithackException {
    private static final HttpStatusCode STATUS_CODE = HttpStatus.NOT_FOUND;

    public ReservationNotFoundException(String message) {
        super(STATUS_CODE, message);
    }

    public ReservationNotFoundException(String message, Throwable cause) {
        super(STATUS_CODE, message, cause);
    }
}
