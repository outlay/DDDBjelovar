package com.errormasters.bithack.reservation.model;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ReservationStatusEnum {
    ZAHTJEV_POSLAN("01", "Zahtjev poslan!"),
    ZAHTJEV_POTVRDEN("02", "Zahtjev potvrden!"),
    UGOVOR_NAPRAVLJEN("03", "Ugovor napravljen!"),
    UGOVOR_POTPISAN_GRADONACELNIK("04", "Ugovor potpisan od strane gradonačelnika!"),
    UGOVOR_POTPISAN_STRANKA("05", "Ugovor potpisan od strane stranke!"),
    UGOVOR_PLACEN("06", "Ugovor plaćen!"),
    JAMCEVINA_VRACENA("07", "Jamčevina vraćena!");

    private final String code;
    private final String description;
}
