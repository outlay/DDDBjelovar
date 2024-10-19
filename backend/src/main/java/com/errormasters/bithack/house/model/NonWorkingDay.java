package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "NON_WORKING_DAYS")
@Data
public class NonWorkingDay extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMUNITY_HOUSE_ID", nullable = false)
    private CommunityHouse communityHouse;

    @Enumerated
    @Column(name = "DAY_OF_WEEK", nullable = false)
    private DayOfWeek dayOfWeek;
}
