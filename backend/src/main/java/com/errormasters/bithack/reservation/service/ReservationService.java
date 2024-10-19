package com.errormasters.bithack.reservation.service;

import com.errormasters.bithack.reservation.exception.ReservationAccessDeniedException;
import com.errormasters.bithack.reservation.model.Reservation;
import com.errormasters.bithack.reservation.repository.ReservationRepository;
import com.errormasters.bithack.security.util.UserUtil;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public List<Reservation> getAllReservationsByUserId(Long userId) {
        if (Objects.equals(UserUtil.getCurrentUserId(), userId)) {
            return reservationRepository.findAllByUserId(userId);
        } else {
            throw new ReservationAccessDeniedException("Nije dozvoljeno gledati tuđe rezervacije!");
        }
    }

}
