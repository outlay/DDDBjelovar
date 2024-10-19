package com.errormasters.bithack.reservation.mapper;

import com.errormasters.bithack.reservation.dto.ReservationResponse;
import com.errormasters.bithack.reservation.model.Reservation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ReservationMapper {
    List<ReservationResponse> toReservationResponse(List<Reservation> reservations);
}
