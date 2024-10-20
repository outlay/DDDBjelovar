package com.errormasters.bithack.reservation.dto;

public record ReservationConfirmationResponse(
        Long reservationId,
        String message
) {
}
