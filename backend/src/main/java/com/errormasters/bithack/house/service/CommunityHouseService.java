package com.errormasters.bithack.house.service;

import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.repository.CommunityHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityHouseService {
    private final CommunityHouseRepository communityHouseRepository;

    public List<CommunityHouse> fetchCommunityHouses() {
        return communityHouseRepository.findAll();
    }
}

