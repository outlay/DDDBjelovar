package com.errormasters.bithack.reservation.mapper;

import com.errormasters.bithack.reservation.dto.ReservationDetailsResponse;
import com.errormasters.bithack.reservation.dto.ReservationRequest;
import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.model.Reservation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ReservationMapper {
    List<ReservationResponse> mapToReservationResponse(List<Reservation> reservations);

    @Mapping(target = "communityHouseName", source = "communityHouse.name")
    ReservationResponse mapToReservationResponse(Reservation reservations);

    @Mapping(target = "communityHouseName", source = "communityHouse.name")
    ReservationDetailsResponse mapToReservationDetailsResponse(Reservation reservations);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "issueDate", expression = "java(java.time.LocalDate.now())")
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "userId", ignore = true)
    Reservation mapToReservation(ReservationRequest reservationRequest);

}
