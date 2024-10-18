package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalTime;

@Entity
@Table(name = "WORKING_HOURS")
@Data
public class WorkingHours extends AuditableEntity {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMUNITY_HOUSE_ID", nullable = false)
    private CommunityHouse communityHouse;

    @Enumerated
    @Column(nullable = false, name = "DAY_OF_WEEK")
    private DayOfWeek dayOfWeek;

    @Column(nullable = false, name = "START_TIME")
    private LocalTime startTime;

    @Column(nullable = false, name = "END_TIME")
    private LocalTime endTime;
}
