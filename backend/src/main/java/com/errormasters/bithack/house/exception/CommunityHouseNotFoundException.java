package com.errormasters.bithack.house.exception;

import com.errormasters.bithack.common.exception.NotFoundException;

public class CommunityHouseNotFoundException extends NotFoundException {
    public CommunityHouseNotFoundException(String message) {
        super(message);
    }

    public CommunityHouseNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
