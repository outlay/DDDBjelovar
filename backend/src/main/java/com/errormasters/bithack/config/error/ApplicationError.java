package com.errormasters.bithack.config.error;

import java.time.LocalDateTime;
import java.util.List;

public record ApplicationError(
        int statusCode,
        String message,
        String error,
        LocalDateTime timestamp,
        List<FieldError> fieldErrors
) {
}
