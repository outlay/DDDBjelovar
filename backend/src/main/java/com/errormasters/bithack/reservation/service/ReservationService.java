package com.errormasters.bithack.reservation.service;

import com.errormasters.bithack.reservation.exception.ReservationAccessDeniedException;
import com.errormasters.bithack.reservation.exception.ReservationNotFoundException;
import com.errormasters.bithack.reservation.model.Reservation;
import com.errormasters.bithack.reservation.repository.ReservationRepository;
import com.errormasters.bithack.security.entity.User;
import com.errormasters.bithack.security.entity.pojo.RoleEnum;
import com.errormasters.bithack.security.service.UserService;
import com.errormasters.bithack.security.util.UserUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    private final UserService userService;

    public List<Reservation> getAllReservationsByUserId() {
        return reservationRepository.findAllByUserId(UserUtil.getCurrentUserId());
    }

    public Reservation getReservationById(Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isPresent()) {
            if (reservation.get().getUserId().equals(UserUtil.getCurrentUserId())) {
                return reservation.get();
            } else {
                Optional<User> user = userService.findUserById(UserUtil.getCurrentUserId());
                if (user.isPresent()) {
                    if (user.get().getRole().equals(RoleEnum.ROLE_MAYOR.name()) ||
                            user.get().getRole().equals(RoleEnum.ROLE_CITY_SERVICE.name()) ||
                            user.get().getRole().equals(RoleEnum.ROLE_JANITOR.name())) {
                        return reservation.get();
                    } else {
                        throw new ReservationAccessDeniedException("Nemate pravo pristupiti podacima tražene rezervacije");
                    }
                } else {
                    throw new ReservationNotFoundException("Tražena rezervacija nije valjana");
                }
            }
        } else {
            throw new ReservationNotFoundException("Rezervacija nije pronađena");
        }
    }
}
