package com.errormasters.bithack.reservation.repository;

import com.errormasters.bithack.reservation.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByUserId(Long userId);
//    List<Reservation>
//            findAllByCommunityHouseIdAndDateTimeFrom
}
