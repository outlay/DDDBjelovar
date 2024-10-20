package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import com.errormasters.bithack.reservation.model.Reservation;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "COMMUNITY_HOUSE")
@Data
public class CommunityHouse extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private Category category;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COORDINATES_ID")
    private Coordinates coordinates;

    @Column(name = "NAME", nullable = false)
    private String name;

    @Column(name = "ADDRESS", nullable = false)
    private String address;

    @Column(name = "SQUARING", nullable = false, precision = 10, scale = 2)
    private BigDecimal squaring;

    @Column(name = "CUTLERY_RENT_AMOUNT_PER_PERSON", precision = 10, scale = 2)
    private BigDecimal cutleryRentAmountPerPerson;

    @Column(name = "APROX_NUMBER_OF_OCCUPANTS", precision = 10, scale = 2)
    private BigDecimal approxNumberOfOccupants;

    @Column(name = "NOTE")
    private String note;

    @Column(name = "ACTIVE", nullable = false)
    private boolean active = true;

    @OneToMany(mappedBy = "communityHouse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<NonWorkingDay> nonWorkingDays;

    @OneToMany(mappedBy = "communityHouse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Image> images;

    @OneToMany(mappedBy = "communityHouse", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reservation> reservations;
}


