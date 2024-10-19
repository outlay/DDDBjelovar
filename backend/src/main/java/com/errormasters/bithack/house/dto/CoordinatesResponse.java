package com.errormasters.bithack.house.dto;

import java.math.BigDecimal;

public record CoordinatesResponse(
        BigDecimal latitude,
        BigDecimal longitude
) {
}
