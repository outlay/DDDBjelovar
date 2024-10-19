package com.errormasters.bithack.house.repository;

import com.errormasters.bithack.house.model.PurposeCategoryPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurposeCategoryPriceRespository extends JpaRepository<PurposeCategoryPrice, Long> {
    List<PurposeCategoryPrice> findAllByCategoryId(Long categoryId);
}
