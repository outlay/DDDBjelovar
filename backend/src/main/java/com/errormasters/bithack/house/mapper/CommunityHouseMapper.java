package com.errormasters.bithack.house.mapper;

import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import com.errormasters.bithack.house.dto.CoordinatesResponse;
import com.errormasters.bithack.house.dto.ImageResponse;
import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.model.Coordinates;
import com.errormasters.bithack.house.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface CommunityHouseMapper {
    List<CommunityHouseResponse> mapToResponse(List<CommunityHouse> communityHouses);

    @Mapping(target= "category", source = "category.name")
    CommunityHouseResponse mapToResponse(CommunityHouse communityHouse);

    List<ImageResponse> mapToImageResponse(List<Image> images);

    CoordinatesResponse mapToCoordinatesResponse(Coordinates coordinates);
}
