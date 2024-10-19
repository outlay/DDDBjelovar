package com.errormasters.bithack.security.entity.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtGenerationResult {

    private final String token;

    private final Long timestamp;
}
