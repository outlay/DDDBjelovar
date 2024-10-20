package com.errormasters.bithack.house.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum DayOfWeek {
    PON(0, "PONEDJELJAK"),
    UTO(1, "UTORAK"),
    SRI(2, "SRIJEDA"),
    CET(3, "ČETVRTAK"),
    PET(4, "PETAK"),
    SUB(5, "SUBOTA"),
    NED(6, "NEDJELJA");

    private final int sifra;
    private final String opis;
}
