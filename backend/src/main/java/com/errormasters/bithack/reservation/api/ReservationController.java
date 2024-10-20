package com.errormasters.bithack.reservation.api;

import com.errormasters.bithack.reservation.dto.ReservationConfirmationResponse;
import com.errormasters.bithack.reservation.dto.ReservationDetailsResponse;
import com.errormasters.bithack.reservation.dto.ReservationRequest;
import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.mapper.ReservationMapper;
import com.errormasters.bithack.reservation.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ReservationController implements ReservationApi {

    private final ReservationService reservationService;

    private final ReservationMapper reservationMapper;

    @Override
    public ResponseEntity<List<ReservationResponse>> fetchReservationsByUserId() {
        var userReservations = reservationService.getAllReservationsByUserId();

        List<ReservationResponse> reservationResponses = new ArrayList<>();
        for (var reservation : userReservations) {
            reservationResponses.add(reservationMapper.mapToReservationResponse(reservation));
        }
        return ResponseEntity.ok(reservationResponses);
    }

    @Override
    public ResponseEntity<ReservationDetailsResponse> fetchReservationById(Long id) {
        var reservation = reservationService.getReservationById(id);

        return ResponseEntity.ok((reservationMapper.mapToReservationDetailsResponse(reservation)));
    }

    @Override
    public ResponseEntity<ReservationConfirmationResponse> createReservation(ReservationRequest reservationRequest) {
        var reservationConfirmation = reservationService.createReservation(reservationRequest);

        return ResponseEntity.ok(reservationConfirmation);
    }
}
