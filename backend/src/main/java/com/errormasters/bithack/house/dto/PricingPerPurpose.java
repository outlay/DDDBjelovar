package com.errormasters.bithack.house.dto;

import java.math.BigDecimal;

public record PricingPerPurpose(
        String purposeName,
        BigDecimal pricePerMeterSquare
) {
}
