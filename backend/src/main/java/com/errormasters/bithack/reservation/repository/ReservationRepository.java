package com.errormasters.bithack.reservation.repository;

import com.errormasters.bithack.reservation.model.Reservation;
import com.errormasters.bithack.reservation.model.ReservationStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAllByUserId(Long userId);

    @Query("SELECT COUNT(r) > 0 FROM Reservation r " +
            "LEFT JOIN r.communityHouse house " +
            "WHERE house.id = :communityHouseId " +
            "AND r.status != :cancelledStatus " +
            "AND ((r.dateTimeFrom <= :endDate AND r.dateTimeTo >= :startDate) " +
            "OR (r.dateTimeFrom >= :startDate AND r.dateTimeFrom < :endDate))")
    boolean existsOverlappingReservation(
            @Param("communityHouseId") Long communityHouseId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("cancelledStatus") ReservationStatusEnum cancelledStatus
    );
}
