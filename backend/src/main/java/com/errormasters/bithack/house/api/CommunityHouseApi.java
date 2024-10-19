package com.errormasters.bithack.house.api;

import com.errormasters.bithack.config.error.ApplicationError;
import com.errormasters.bithack.house.dto.CommunityHouseDetailsResponse;
import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.PastOrPresent;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;

import static com.errormasters.bithack.common.Constants.Api.HOUSES;
import static com.errormasters.bithack.common.Constants.Api.V1;

@RequestMapping(value = V1 + HOUSES)
@Tag(name = "Community houses", description = "Community houses operations")
@Validated
public interface CommunityHouseApi {
    @GetMapping
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = CommunityHouseResponse.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class)))
    })
    @Operation(summary = "Fetches all community houses")
    ResponseEntity<List<CommunityHouseResponse>> fetchCommunityHouses();

    @GetMapping("/{id}")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommunityHouseResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ApplicationError.class)))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ApplicationError.class)))),
            @ApiResponse(responseCode = "404", description = "Not found", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ApplicationError.class)))
    })
    @Operation(summary = "Fetches the community house by ID if the house is available in those dates, otherwise returns 400")
    ResponseEntity<CommunityHouseDetailsResponse> fetchCommunityHouseByDates(
            @Schema(description = "ID of the community house to fetch", required = true)
            @PathVariable("id") Long id,
            @Schema(description = "Start date of the reservation", required = true)
            @RequestParam("startDate") @Future(message = "Početni datum mora biti u budućnosti barem 8 dana")
            LocalDate startDate,
            @Schema(description = "End date of the reservation", required = true)
            @PathVariable("endDate") @Future(message = "Datum kraja mora biti u budućnosti")
            LocalDate endDate
    );
}
