package com.errormasters.bithack.reservation.mapper;

import com.errormasters.bithack.reservation.dto.ReservationDetailsResponse;
import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface ReservationMapper {
    List<ReservationResponse> mapToReservationResponse(List<Reservation> reservations);

    @Mapping(target = "communityHouseName", source = "communityHouse.name")
    ReservationResponse mapToReservationResponse(Reservation reservations);

    @Mapping(target = "communityHouseName", source = "communityHouse.name")
    ReservationDetailsResponse mapToReservationDetailsResponse(Reservation reservations);

}
