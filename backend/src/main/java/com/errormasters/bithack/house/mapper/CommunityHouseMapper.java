package com.errormasters.bithack.house.mapper;

import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import com.errormasters.bithack.house.model.CommunityHouse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CommunityHouseMapper {
    List<CommunityHouseResponse> mapToResponse(List<CommunityHouse> communityHouses);
}
