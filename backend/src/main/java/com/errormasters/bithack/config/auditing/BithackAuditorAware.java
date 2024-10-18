package com.errormasters.bithack.config.auditing;

import lombok.NonNull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BithackAuditorAware implements AuditorAware<String> {
    @Override
    public @NonNull Optional<String> getCurrentAuditor() {
        return Optional.of("Luka");
    } // TODO Matija dodaj da vuce iz security contexta
}
