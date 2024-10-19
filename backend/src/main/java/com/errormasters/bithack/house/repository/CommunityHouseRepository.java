package com.errormasters.bithack.house.repository;

import com.errormasters.bithack.house.model.CommunityHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityHouseRepository extends JpaRepository<CommunityHouse, Long> {
}
