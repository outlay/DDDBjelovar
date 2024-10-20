package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "CATEGORY")
@Data
public class Category extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "OVERHEAD_PRICE", nullable = false, precision = 10, scale = 2)
    private BigDecimal overheadPrice;
}
