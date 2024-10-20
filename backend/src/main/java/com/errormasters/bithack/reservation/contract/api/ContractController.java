package com.errormasters.bithack.reservation.contract.api;

import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import com.errormasters.bithack.reservation.contract.dto.ContractCreatedResponse;
import com.errormasters.bithack.reservation.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ContractController implements ContractApi {
    private final ContractService contractService;

    @Override
    public ResponseEntity<ContractCreatedResponse> createContract(Long reservationId) {
        log.info("Creating contract for reservation {}", reservationId);
        contractService.createContract("Contract for reservation " + reservationId + " created", reservationId);
        return ResponseEntity.ok(new ContractCreatedResponse("Ugovor za rezervaciju " + reservationId + " je uspješno kreiran")); // todo implement
    }
}
