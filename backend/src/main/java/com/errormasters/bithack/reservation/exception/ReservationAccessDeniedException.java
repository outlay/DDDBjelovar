package com.errormasters.bithack.reservation.exception;

import com.errormasters.bithack.common.exception.BithackException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

public class ReservationAccessDeniedException extends BithackException {
    private static final HttpStatusCode STATUS_CODE = HttpStatus.FORBIDDEN;

    public ReservationAccessDeniedException(String message, Throwable cause) {
        super(STATUS_CODE, message, cause);
    }

    public ReservationAccessDeniedException(String message) {
        super(STATUS_CODE, message);
    }
}
