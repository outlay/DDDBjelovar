package com.errormasters.bithack.house.model;

import com.errormasters.bithack.common.model.AuditableEntity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "IMAGE")
public class Image extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMUNITY_HOUSE_ID", nullable = false)
    private CommunityHouse communityHouse;

    @Column(name = "URL", nullable = false)
    private String url;
}
