package com.errormasters.bithack.house.dto;

import java.math.BigDecimal;
import java.util.List;

public record CommunityHouseResponse(
        Long id,
        String name,
        String address,
        BigDecimal squaring,
        String category,
        BigDecimal cutleryRentAmountPerPerson,
        Double approxNumberOfOccupants,
        String note,
        boolean active,
        CoordinatesResponse coordinates,
        List<ImageResponse> images
) {
}
