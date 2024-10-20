package com.errormasters.bithack.house.repository;

import com.errormasters.bithack.house.model.CommunityHouse;
import com.errormasters.bithack.reservation.model.ReservationStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CommunityHouseRepository extends JpaRepository<CommunityHouse, Long> {
    @Query("SELECT DISTINCT house FROM CommunityHouse house " +
            "WHERE house.active = true " +
            "AND (:capacity IS NULL OR house.approxNumberOfOccupants >= :capacity) " +
            "AND house NOT IN (" +
                "SELECT r.communityHouse FROM Reservation r " +
                "WHERE r.status != :cancelledStatus " +
                "AND ((r.dateTimeFrom <= :endDate AND r.dateTimeTo >= :startDate) " +
                "OR (r.dateTimeFrom >= :startDate AND r.dateTimeFrom < :endDate))" +
            ")")
    List<CommunityHouse> findAllByCapacityAndAvailable(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("capacity") Integer capacity,
            @Param("cancelledStatus") ReservationStatusEnum cancelledStatus
    );

    Optional<CommunityHouse> findByName(String houseName);
}
