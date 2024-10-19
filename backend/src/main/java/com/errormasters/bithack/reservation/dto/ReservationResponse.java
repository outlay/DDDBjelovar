package com.errormasters.bithack.reservation.dto;

import com.errormasters.bithack.reservation.model.ReservationStatusEnum;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record ReservationResponse(
        Long id,
        Long communityHouseId,
        Long purposeId,
        Long userId,
        Long reservationAmountId,
        Long recordId,
        String bank,
        String iban,
        String localBoardName,
        LocalDate issueDate,
        LocalDateTime dateTimeFrom,
        LocalDateTime dateTimeTo,
        ReservationStatusEnum status
) {
}
