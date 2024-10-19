package com.errormasters.bithack.house.dto;

import com.errormasters.bithack.common.dto.SifraOpis;

import java.math.BigDecimal;
import java.util.List;

public record CommunityHouseDetailsResponse(
        Long id,
        String name,
        String address,
        BigDecimal squaring,
        String category,
        List<PricingPerPurpose> pricesPerPurpose,
        BigDecimal cutleryRentAmountPerPerson,
        Double approxNumberOfOccupants,
        String note,
        boolean active,
        CoordinatesResponse coordinates,
        List<SifraOpis> nonWorkingDays,
        List<ImageResponse> images
) {
}
