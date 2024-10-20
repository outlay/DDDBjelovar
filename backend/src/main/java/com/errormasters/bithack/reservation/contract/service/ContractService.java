package com.errormasters.bithack.reservation.contract.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContractService {
    private final JmsTemplate jmsTemplate;

    public void createContract(String message) {
        log.info("Sending message: {}", message);

        // todo
        // spremanje ugovora u bazu....
        // slanje tog objekta ugovora na queue
        jmsTemplate.convertAndSend("contract-queue", message);
    }
}
