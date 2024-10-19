package com.errormasters.bithack.reservation.dto;

import com.errormasters.bithack.reservation.model.ReservationStatusEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationResponse(
        Long id,
        String communityHouseName,
        LocalDateTime dateTimeFrom,
        LocalDateTime dateTimeTo,
        ReservationStatusEnum status
) {
}
