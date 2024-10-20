package com.errormasters.bithack.reservation.dto;

import java.time.LocalDateTime;

public record ReservationRequest(
        String communityHouseName,
        Long purposeId,
        Long reservationAmountId,
        Long recordId,
        String bank,
        String iban,
        String localBoardName,
        LocalDateTime dateTimeFrom,
        LocalDateTime dateTimeTo
) {
}

