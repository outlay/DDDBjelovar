package com.errormasters.bithack.reservation.contract.api;

import com.errormasters.bithack.config.error.ApplicationError;
import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import com.errormasters.bithack.reservation.contract.dto.ContractCreatedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import static com.errormasters.bithack.common.Constants.Api.*;

@RequestMapping(value = V1 + RESERVATIONS + "/{reservationId}" + CONTRACTS)
@Tag(name = "Community houses", description = "Community houses operations")
@Validated
public interface ContractApi {
    @PostMapping
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Created", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CommunityHouseResponse.class)))),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class)))
    })
    @Operation(summary = "Issues a contract for the reservation")
    ResponseEntity<ContractCreatedResponse> createContract(
            @Schema(description = "Reservation ID", required = true)
            @PathVariable Long reservationId
    );
}
