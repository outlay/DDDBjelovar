package com.errormasters.bithack.house.service;

import com.errormasters.bithack.common.exception.ValidationException;
import com.errormasters.bithack.config.error.FieldError;
import com.errormasters.bithack.house.dto.CommunityHouseDetailsResponse;
import com.errormasters.bithack.house.exception.CommunityHouseNotFoundException;
import com.errormasters.bithack.house.exception.OverlappingReservationException;
import com.errormasters.bithack.house.mapper.CommunityHouseMapper;
import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.repository.CommunityHouseRepository;
import com.errormasters.bithack.reservation.model.ReservationStatusEnum;
import com.errormasters.bithack.reservation.repository.ReservationRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class CommunityHouseService {
    private final CommunityHouseRepository communityHouseRepository;
    private final ReservationRepository reservationRepository;
    private final CommunityHouseMapper communityHouseMapper;

    public List<CommunityHouse> fetchCommunityHouses() {
        return communityHouseRepository.findAll();
    }

    public List<CommunityHouse> fetchCommunityHouses(
            @NotNull LocalDate startDate, @NotNull LocalDate endDate, Integer capacity) {
        return communityHouseRepository.findAllByCapacityAndAvailable(
                startDate.atStartOfDay(), endDate.atStartOfDay(), capacity, ReservationStatusEnum.ZAHTJEV_OTKAZAN);
    }

    @Transactional
    public CommunityHouseDetailsResponse fetchCommunityHouseByDates(
            @NotNull Long id, @NotNull LocalDate startDate, @NotNull LocalDate endDate) {

        if (endDate.isBefore(startDate)) {
            throw new ValidationException(
                    "Krajnji datum ne može biti prije početnog datuma!",
                    new FieldError("endDate", "Krajnji datum ne može biti prije početnog datuma!"));
        }

        var reservationAlreadyExists = reservationRepository
                .existsOverlappingReservation(
                        id, startDate.atStartOfDay(), endDate.atStartOfDay(), ReservationStatusEnum.ZAHTJEV_OTKAZAN);

        if (reservationAlreadyExists) {
            throw new OverlappingReservationException("Rezervacija već postoji za ovaj period!");
        }

        var communityHouse = communityHouseRepository
                .findById(id)
                .orElseThrow(() -> new CommunityHouseNotFoundException("Društveni dom nije nađen!"));
        return communityHouseMapper.mapToDetailsResponse(communityHouse);
    }

    @Transactional
    public CommunityHouseDetailsResponse fetchCommunityHouseById(@NotNull Long id) {
        var communityHouse = communityHouseRepository
                .findById(id)
                .orElseThrow(() -> new CommunityHouseNotFoundException("Društveni dom nije nađen!"));
        return communityHouseMapper.mapToDetailsResponse(communityHouse);
    }
}

