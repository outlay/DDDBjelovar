package com.errormasters.bithack.house.exception;

import com.errormasters.bithack.common.exception.BithackException;
import org.springframework.http.HttpStatus;

public class OverlappingReservationException extends BithackException {
    public OverlappingReservationException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }

    public OverlappingReservationException(String message, Throwable cause) {
        super(HttpStatus.BAD_REQUEST, message, cause);
    }
}
