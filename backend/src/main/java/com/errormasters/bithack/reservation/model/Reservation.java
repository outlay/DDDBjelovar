package com.errormasters.bithack.reservation.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "RESERVATION")
@Data
public class Reservation {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "COMMUNITY_HOUSE_ID", nullable = false)
    private Long communityHouseId;

    @Column(name = "PURPOSE_ID", nullable = false)
    private Long purposeId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    @Column(name = "RESERVATION_AMOUNT_ID")
    private Long reservationAmountId;

    @Column(name = "RECORD_ID")
    private Long recordId;

    @Column(name = "BANK", nullable = false, length = 255)
    private String bank;

    @Column(name = "IBAN", nullable = false, length = 255)
    private String iban;

    @Column(name = "LOCAL_BOARD_NAME", length = 255)
    private String localBoardName;

    @Column(name = "ISSUE_DATE", nullable = false)
    private LocalDate issueDate;

    @Column(name = "DATE_TIME_FROM", nullable = false)
    private LocalDateTime dateTimeFrom;

    @Column(name = "DATE_TIME_TO", nullable = false)
    private LocalDateTime dateTimeTo;

    @Enumerated
    @Column(name = "STATUS", nullable = false)
    private ReservationStatusEnum status;

}
