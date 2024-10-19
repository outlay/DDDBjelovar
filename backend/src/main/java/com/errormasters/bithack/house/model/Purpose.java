package com.errormasters.bithack.house.model;

import jakarta.persistence.*;
import lombok.Data;
import com.errormasters.bithack.common.model.AuditableEntity;

@Entity
@Table(name = "PURPOSE")
@Data
public class Purpose extends AuditableEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME", nullable = false)
    private String name;
}
