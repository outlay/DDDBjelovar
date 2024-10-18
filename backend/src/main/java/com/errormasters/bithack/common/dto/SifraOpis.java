package com.errormasters.bithack.common.dto;

public record SifraOpis(String sifra, String opis) {
    public static SifraOpis of(String sifra, String opis) {
        return new SifraOpis(sifra, opis);
    }

    public static SifraOpis empty() {
        return new SifraOpis(null, null);
    }
}
