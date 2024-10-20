package com.errormasters.bithack.reservation.api;

import com.errormasters.bithack.reservation.dto.ReservationConfirmationResponse;
import com.errormasters.bithack.reservation.dto.ReservationDetailsResponse;
import com.errormasters.bithack.reservation.dto.ReservationRequest;
import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.model.Reservation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.errormasters.bithack.common.Constants.Api.*;

@RequestMapping(value = V1 + RESERVATIONS)
@Tag(name = "Reservations", description = "Reservations operations")
@Validated
public interface ReservationApi {

    @GetMapping(RESERVATIONS_BY_USER)
    @Operation(summary = "Fetches the reservations of a specific user by its id")
    ResponseEntity<List<ReservationResponse>> fetchReservationsByUserId();

    @GetMapping("/{id}")
    @Operation(summary = "Fetches the reservation details by id")
    ResponseEntity<ReservationDetailsResponse> fetchReservationById(@PathVariable Long id);

    @PostMapping
    @Operation(summary = "Creates a reservation for a specific community house")
    ResponseEntity<ReservationConfirmationResponse> createReservation(@RequestBody ReservationRequest reservationRequest);
}
