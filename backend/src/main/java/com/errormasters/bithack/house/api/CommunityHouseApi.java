package com.errormasters.bithack.house.api;

import com.errormasters.bithack.house.dto.CommunityHouseResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

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
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    @Operation(summary = "Fetches all community houses")
    ResponseEntity<List<CommunityHouseResponse>> fetchCommunityHouses();
}
