package com.errormasters.bithack.house.model;

import jakarta.persistence.*;
import lombok.Data;
import com.errormasters.bithack.common.model.AuditableEntity;

import java.math.BigDecimal;

@Entity
@Table(name = "PURPOSE_CATEGORY_PRICE")
@Data
public class PurposeCategoryPrice extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PURPOSE_ID", nullable = false)
    private Purpose purpose;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private Category category;

    @Column(name = "PRICE_PER_METER", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerMeter;
}
