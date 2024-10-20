package com.errormasters.bithack.house.mapper;

import com.errormasters.bithack.common.dto.SifraOpis;
import com.errormasters.bithack.house.dto.*;
import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.house.model.Coordinates;
import com.errormasters.bithack.house.model.Image;
import com.errormasters.bithack.house.model.NonWorkingDay;
import com.errormasters.bithack.house.repository.PurposeCategoryPriceRespository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper
public abstract class CommunityHouseMapper {
    private PurposeCategoryPriceRespository purposeCategoryPriceRespository;

    @Autowired
    public void setPurposeCategoryPriceRespository(PurposeCategoryPriceRespository purposeCategoryPriceRespository) {
        this.purposeCategoryPriceRespository = purposeCategoryPriceRespository;
    }

    public abstract List<CommunityHouseResponse> mapToResponse(List<CommunityHouse> communityHouses);

    @Mapping(target= "category", source = "category.name")
    public abstract CommunityHouseResponse mapToResponse(CommunityHouse communityHouse);

    public abstract List<ImageResponse> mapToImageResponse(List<Image> images);

    public abstract CoordinatesResponse mapToCoordinatesResponse(Coordinates coordinates);

    @Mapping(target = "category", source = "category.name")
    @Mapping(target = "pricesPerPurpose", source = ".", qualifiedByName = "mapToPricingPerPurpose")
    @Mapping(target = "nonWorkingDays", source = "nonWorkingDays", qualifiedByName = "mapToSifraOpis")
    public abstract CommunityHouseDetailsResponse mapToDetailsResponse(CommunityHouse communityHouse);

    @Named("mapToPricingPerPurpose")
    public List<PricingPerPurpose> mapToPricingPerPurpose(CommunityHouse communityHouse) {
        var pricingPerPurposeForCategory =
                purposeCategoryPriceRespository.findAllByCategoryId(communityHouse.getCategory().getId());

        return pricingPerPurposeForCategory.stream()
                .map(pricingPerPurpose -> new PricingPerPurpose(
                        pricingPerPurpose.getPurpose().getName(),
                        pricingPerPurpose.getPricePerMeter()))
                .toList();
    }

    @Named("mapToSifraOpis")
    public List<SifraOpis> mapToSifraOpis(List<NonWorkingDay> nonWorkingDays) {
        return nonWorkingDays.stream()
                .map(nonWorkingDay ->
                        new SifraOpis(
                                String.valueOf(nonWorkingDay.getDayOfWeek().getSifra()),
                                nonWorkingDay.getDayOfWeek().getOpis()))
                .toList();
    }
}
