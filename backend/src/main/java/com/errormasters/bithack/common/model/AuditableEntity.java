package com.errormasters.bithack.common.model;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableEntity {
    @CreatedDate
    @Column(
            name = "CREATED_AT",
            nullable = false,
            updatable = false
    )
    protected LocalDateTime createdAt;

    @LastModifiedDate
    @Column(
            name = "UPDATED_AT",
            nullable = false
    )
    protected LocalDateTime updatedAt;

    @CreatedBy
    @Column(
            name = "CREATED_BY",
            nullable = false,
            updatable = false
    )
    protected String createdBy;

    @LastModifiedBy
    @Column(
            name = "UPDATED_BY",
            nullable = false
    )
    protected String updatedBy;
}
