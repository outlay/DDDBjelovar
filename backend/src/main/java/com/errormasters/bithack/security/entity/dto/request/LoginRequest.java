package com.errormasters.bithack.security.entity.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.NotNull;

@Getter
@Setter
public class LoginRequest {
    @NotNull
    @Schema(description = "User's email")
    private String email;

    @NotNull
    @Schema(description = "User's password")
    private String password;
}
