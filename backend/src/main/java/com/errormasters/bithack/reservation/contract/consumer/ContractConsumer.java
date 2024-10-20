package com.errormasters.bithack.reservation.contract.consumer;

import com.errormasters.bithack.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ContractConsumer {
    private NotificationService notificationService;

    @JmsListener(destination = "contract-queue")
    public void receiveContract(Object contract) {
        // notify sve ljude koji moraju dobiti notifikaciju da je kreiran ugovor
        notificationService.notifyGradonacelnik(contract);
    }
}
