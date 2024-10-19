package com.errormasters.bithack.security.api;

import com.errormasters.bithack.security.entity.dto.request.LoginRequest;
import com.errormasters.bithack.security.entity.dto.request.SignupRequest;
import com.errormasters.bithack.security.entity.dto.response.JwtResponse;
import com.errormasters.bithack.security.entity.dto.response.SignupResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import static com.errormasters.bithack.common.Constants.Api.*;

@RequestMapping(value = V1 + USERS)
@Tag(name = "Users", description = "Users operations")
@Validated
public interface UserApi {
    @PostMapping(LOGIN)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JwtResponse.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    @Operation(summary = "Fetches access token / authenticates user")
    ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest);

    @PostMapping
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(mediaType = "application/json", schema = @Schema(implementation = SignupResponse.class))),
            @ApiResponse(responseCode = "409", description = "Conflict", content = @Content(mediaType = "application/json")),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
    })
    @Operation(summary = "Register user")
    ResponseEntity<SignupResponse> addUser(@Valid @RequestBody SignupRequest signupRequest);
}


