package com.errormasters.bithack.house.api;

import com.errormasters.bithack.house.dto.CommunityHouseDetailsResponse;
import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import com.errormasters.bithack.house.mapper.CommunityHouseMapper;
import com.errormasters.bithack.house.service.CommunityHouseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class CommunityHouseController implements CommunityHouseApi {
    private final CommunityHouseService communityHouseService;
    private final CommunityHouseMapper communityHouseMapper;

    @Override
    public ResponseEntity<List<CommunityHouseResponse>> fetchCommunityHouses() {
        log.info("Fetching community houses");

        var communityHouses = communityHouseService.fetchCommunityHouses();

        return ResponseEntity.ok(communityHouseMapper.mapToResponse(communityHouses));
    }

    @Override
    public ResponseEntity<List<CommunityHouseResponse>> fetchCommunityHouses(
            LocalDate startDate, LocalDate endDate, Integer capacity) {
        log.info("Fetching community houses by capacity, start and end date");

        var communityHouses = communityHouseService.fetchCommunityHouses(startDate, endDate, capacity);

        return ResponseEntity.ok(communityHouseMapper.mapToResponse(communityHouses));
    }

    @Override
    public ResponseEntity<CommunityHouseDetailsResponse> fetchCommunityHouseByDates(
            Long id, LocalDate startDate, LocalDate endDate) {
        log.info("Fetching community house by dates");

        return ResponseEntity.ok(
                communityHouseService.fetchCommunityHouseByDates(id, startDate, endDate)
        );
    }

    @Override
    public ResponseEntity<CommunityHouseDetailsResponse> fetchCommunityHouseByDates(Long id) {
        log.info("Fetching community house by ID");

        return ResponseEntity.ok(
                communityHouseService.fetchCommunityHouseById(id)
        );
    }
}
