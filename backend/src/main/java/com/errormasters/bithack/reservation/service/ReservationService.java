package com.errormasters.bithack.reservation.service;

import com.errormasters.bithack.house.exception.CommunityHouseNotFoundException;
import com.errormasters.bithack.house.exception.OverlappingReservationException;
import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.repository.CommunityHouseRepository;
import com.errormasters.bithack.reservation.dto.ReservationConfirmationResponse;
import com.errormasters.bithack.reservation.dto.ReservationRequest;
import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.exception.ReservationAccessDeniedException;
import com.errormasters.bithack.reservation.exception.ReservationNotFoundException;
import com.errormasters.bithack.reservation.mapper.ReservationMapper;
import com.errormasters.bithack.reservation.model.Reservation;
import com.errormasters.bithack.reservation.model.ReservationStatusEnum;
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

    private final CommunityHouseRepository communityHouseRepository;

    private final UserService userService;

    private final ReservationMapper reservationMapper;

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

    public ReservationConfirmationResponse createReservation(ReservationRequest reservationRequest) {
        Optional<CommunityHouse> communityHouse = communityHouseRepository.findByName(reservationRequest.communityHouseName());
        if (communityHouse.isPresent()) {
            if (reservationRepository.existsOverlappingReservation(communityHouse.get().getId(),
                    reservationRequest.dateTimeFrom(), reservationRequest.dateTimeTo(), ReservationStatusEnum.ZAHTJEV_OTKAZAN)) {
                Reservation reservation = reservationMapper.mapToReservation(reservationRequest);
                reservation.setCommunityHouse(communityHouse.get());
                reservation.setStatus(ReservationStatusEnum.ZAHTJEV_POSLAN);
                reservation.setUserId(UserUtil.getCurrentUserId());
                Reservation savedReservation = reservationRepository.save(reservation);
                return new ReservationConfirmationResponse(savedReservation.getId(), "Zahtjev za rezervacijom je uspješno poslan");
            } else {
                throw new OverlappingReservationException("Traženi društveni dom nije dostupan u željenom periodu");
            }
        } else {
            throw new CommunityHouseNotFoundException("Ne postoji traženi društveni dom");
        }
    }
}
