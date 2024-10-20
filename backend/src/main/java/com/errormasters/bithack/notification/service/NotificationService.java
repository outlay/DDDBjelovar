package com.errormasters.bithack.notification.service;

import com.errormasters.bithack.notification.dto.ContractNotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    public void notifyGradonacelnik(Object contract) {
        ContractNotificationDto notification = new ContractNotificationDto("Test");

        simpMessagingTemplate.convertAndSend("/topic/gradonacelnik/contracts", notification);
    }
}
