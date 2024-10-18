package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "COMMUNITY_HOUSE")
@Data
public class CommunityHouse extends AuditableEntity {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @Column(name = "RENT_AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal rentAmount;

    @Column(name = "GUARANTEE_AMOUNT", nullable = false, precision = 10, scale = 2)
    private BigDecimal guaranteeAmount;

    @Column(name = "SQUARING", nullable = false, precision = 10, scale = 2)
    private BigDecimal squaring;

    @Column(name = "CUTLERY_RENT_AMOUNT_PER_PERSON", precision = 10, scale = 2)
    private BigDecimal cutleryRentAmountPerPerson;

    @Column(name = "APROX_NUMBER_OF_OCCUPANTS", precision = 10, scale = 2)
    private BigDecimal aproxNumberOfOccupants;

    @Column(name = "NOTE")
    private String note;

    @Column(name = "ACTIVE", nullable = false)
    private boolean active = true;

    @OneToMany(mappedBy = "communityHouse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WorkingHours> workingHours;
}


