package com.errormasters.bithack.house.service;

import com.errormasters.bithack.house.dto.CommunityHouseDetailsResponse;
import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.repository.CommunityHouseRepository;
import com.errormasters.bithack.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityHouseService {
    private final CommunityHouseRepository communityHouseRepository;
    private final ReservationRepository reservationRepository;

    public List<CommunityHouse> fetchCommunityHouses() {
        return communityHouseRepository.findAll();
    }

    public CommunityHouseDetailsResponse fetchCommunityHouseByDates(Long id, LocalDate startDate, LocalDate endDate) {
//        var reservationsOnDates
        return null;
    }
}

