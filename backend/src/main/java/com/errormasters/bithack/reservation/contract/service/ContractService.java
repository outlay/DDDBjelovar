package com.errormasters.bithack.reservation.contract.service;

import com.errormasters.bithack.reservation.model.ReservationStatusEnum;
import com.errormasters.bithack.reservation.repository.ReservationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContractService {
    private final JmsTemplate jmsTemplate;

    private final ReservationRepository reservationRepository;

    public void createContract(String message, Long reservationId) {
        log.info("Sending message: {}", message);
        log.info(message);

        reservationRepository.updateReservationByStatus(reservationId, ReservationStatusEnum.UGOVOR_NAPRAVLJEN);
        jmsTemplate.convertAndSend("contract-queue", message);
    }
}
