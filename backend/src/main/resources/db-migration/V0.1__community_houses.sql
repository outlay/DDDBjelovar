set schema 'BIT_HACK';

CREATE TABLE COMMUNITY_HOUSE(
    ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    NAME VARCHAR(255) NOT NULL,
    ADDRESS VARCHAR(255) NOT NULL,
    RENT_AMOUNT DECIMAL(10, 2) NOT NULL, -- PER HOUR
    GUARANTEE_AMOUNT DECIMAL(10, 2) NOT NULL, -- PER HOUR
    SQUARING DECIMAL(10, 2) NOT NULL,
    CUTLERY_RENT_AMOUNT_PER_PERSON DECIMAL(10, 2), -- PER HOUR
    APROX_NUMBER_OF_OCCUPANTS DECIMAL(10, 2),
    NOTE VARCHAR(255),
    ACTIVE BOOLEAN NOT NULL DEFAULT TRUE,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CREATED_BY VARCHAR(255) NOT NULL,
    UPDATED_BY VARCHAR(255) NOT NULL
);

CREATE TABLE WORKING_HOURS(
    ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    COMMUNITY_HOUSE_ID BIGINT NOT NULL,
    DAY_OF_WEEK INTEGER NOT NULL,
    START_TIME TIME NOT NULL,
    END_TIME TIME NOT NULL,
    CREATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CREATED_BY VARCHAR(255) NOT NULL,
    UPDATED_BY VARCHAR(255) NOT NULL,
    FOREIGN KEY (COMMUNITY_HOUSE_ID) REFERENCES COMMUNITY_HOUSE(ID)
);



-- DATA SEED

INSERT INTO COMMUNITY_HOUSE (
    NAME, ADDRESS, RENT_AMOUNT, GUARANTEE_AMOUNT, SQUARING,
    CUTLERY_RENT_AMOUNT_PER_PERSON, APROX_NUMBER_OF_OCCUPANTS,
    NOTE, ACTIVE, CREATED_BY, UPDATED_BY
)
VALUES
    ('I MO HRGOVLJANI', 'Ulica Zrinska 2a, Bjelovar', 6.63, 3.87, 171.27, 0.40, NULL, 'PONEDJELJAK I SRIJEDA- NE IZNAJMLJIVATI', TRUE, 'system', 'system'),
    ('I MO GUDOVAC', 'Ulica Zrinska 2a, Bjelovar', 10.18, 3.87, 263.2, 0.40, 135, NULL, TRUE, 'system', 'system'),
    ('II PROKLJUVANI', 'Ulica Zrinska 2a, Bjelovar', 2.32, 2.90, 84, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I MO KOKINAC', 'Ulica Zrinska 2a, Bjelovar', 4.82, 3.87, 124.41, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I MO NOVOSELJANI', 'Ulica Zrinska 2a, Bjelovar', 5.77, 3.87, 148.93, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('II MO OBROVNICA', 'Ulica Zrinska 2a, Bjelovar', 1.99, 2.90, 72.03, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I MO GORNJE PLAVNICE', 'Ulica Zrinska 2a, Bjelovar', 5.62, 3.87, 145.17, NULL, 70, NULL, TRUE, 'system', 'system'),
    ('I MO STARE PLAVNICE', 'Ulica Zrinska 2a, Bjelovar', 3.65, 3.87, 94.36, NULL, NULL, 'PETAK- NE IZNAJMLJIVATI', TRUE, 'system', 'system'),
    ('II MO VELIKO KORENOVO', 'Ulica Zrinska 2a, Bjelovar', 5.40, 2.90, 195.4, 0.40, 100, NULL, TRUE, 'system', 'system'),
    ('II MO TROJSTVENI MARKOVAC', 'Ulica Zrinska 2a, Bjelovar', 2.77, 2.90, 100.31, NULL, 60, 'dogovor sa domaricom za suđe', TRUE, 'system', 'system'),
    ('II ŽDRALOVI', 'Ulica Zrinska 2a, Bjelovar', 4.39, 2.90, 158.8, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I MO PATKOVAC', 'Ulica Zrinska 2a, Bjelovar', 9.91, 3.87, 256, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('II MO PRGOMELJE', 'Ulica Zrinska 2a, Bjelovar', 2.79, 2.90, 100.85, NULL, NULL, 'PETAK- NE IZNAJMLJIVATI', TRUE, 'system', 'system'),
    ('I MO CIGLENA', 'Ulica Zrinska 2a, Bjelovar', 6.39, 3.87, 165.08, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I KRIŽEVAČKA CESTA', 'Ulica Zrinska 2a, Bjelovar', 8.86, 3.87, 228.8, 0.40, NULL, NULL, TRUE, 'system', 'system'),
    ('I MO DR. ANTE STARČEVIĆ', 'Ulica Zrinska 2a, Bjelovar', 4.49, 3.87, 116.11, NULL, NULL, 'NAJVIŠE DO 22 SATA, NE IZNAJMLJIVATI vikendom za fešte', TRUE, 'system', 'system'),
    ('II MO TOMAŠ', 'Ulica Zrinska 2a, Bjelovar', 4.07, 2.90, 147.26, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('I BAN JOSIP JELAČIĆ', 'Ulica Zrinska 2a, Bjelovar', 1.52, 3.87, 39.39, NULL, NULL, NULL, TRUE, 'system', 'system'),
    ('II GALOVAC', 'Ulica Zrinska 2a, Bjelovar', 4.28, 2.90, 154.93, NULL, NULL, 'SAMO ZA KARMINE', TRUE, 'system', 'system'),
    ('II BREZOVAC', 'Ulica Zrinska 2a, Bjelovar', 2.44, 2.90, 88.26, NULL, NULL, 'NE IZNAJMLJUJE SE', FALSE, 'system', 'system'),
    ('I MO STJEPAN RADIĆ', 'Ulica Zrinska 2a, Bjelovar', 6.03, 3.87, 155.9, NULL, NULL, 'NE IZNAJMLJUJE SE', FALSE, 'system', 'system'),
    ('II PRESPA', 'Ulica Zrinska 2a, Bjelovar', 3.70, 2.90, 133.9, NULL, NULL, 'NE IZNAJMLJUJE SE - pola od DVD-a na uporabu', FALSE, 'system', 'system'),
    ('II GORNJI TOMAŠ', 'Ulica Zrinska 2a, Bjelovar', 2.33, 2.90, 84.4, NULL, NULL, 'PREMALO, NIJE ZA IZNAJMLJIVATI- IMA MO TOMAŠ', FALSE, 'system', 'system'),
    ('II ŠPORTSKA DVORANA KLOKOČEVAC', 'Ulica Zrinska 2a, Bjelovar', 7.02, 2.90, 254.03, NULL, NULL, 'NE IZNAJMLJIVATI za fešte, zabave...', TRUE, 'system', 'system');


INSERT INTO WORKING_HOURS (COMMUNITY_HOUSE_ID, DAY_OF_WEEK, START_TIME, END_TIME, CREATED_BY, UPDATED_BY)
VALUES
-- I MO HRGOVLJANI (ID 1)
(1, 2, '08:00:00', '16:00:00', 'system', 'system'),
(1, 4, '08:00:00', '16:00:00', 'system', 'system'),
(1, 5, '08:00:00', '16:00:00', 'system', 'system'),
(1, 6, '08:00:00', '16:00:00', 'system', 'system'),
(1, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO GUDOVAC (ID 2)
(2, 1, '08:00:00', '16:00:00', 'system', 'system'),
(2, 2, '08:00:00', '16:00:00', 'system', 'system'),
(2, 3, '08:00:00', '16:00:00', 'system', 'system'),
(2, 4, '08:00:00', '16:00:00', 'system', 'system'),
(2, 5, '08:00:00', '16:00:00', 'system', 'system'),
(2, 6, '08:00:00', '16:00:00', 'system', 'system'),
(2, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II PROKLJUVANI (ID 3)
(3, 1, '08:00:00', '16:00:00', 'system', 'system'),
(3, 2, '08:00:00', '16:00:00', 'system', 'system'),
(3, 3, '08:00:00', '16:00:00', 'system', 'system'),
(3, 4, '08:00:00', '16:00:00', 'system', 'system'),
(3, 5, '08:00:00', '16:00:00', 'system', 'system'),
(3, 6, '08:00:00', '16:00:00', 'system', 'system'),
(3, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO KOKINAC (ID 4)
(4, 1, '08:00:00', '16:00:00', 'system', 'system'),
(4, 2, '08:00:00', '16:00:00', 'system', 'system'),
(4, 3, '08:00:00', '16:00:00', 'system', 'system'),
(4, 4, '08:00:00', '16:00:00', 'system', 'system'),
(4, 5, '08:00:00', '16:00:00', 'system', 'system'),
(4, 6, '08:00:00', '16:00:00', 'system', 'system'),
(4, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO NOVOSELJANI (ID 5)
(5, 1, '08:00:00', '16:00:00', 'system', 'system'),
(5, 2, '08:00:00', '16:00:00', 'system', 'system'),
(5, 3, '08:00:00', '16:00:00', 'system', 'system'),
(5, 4, '08:00:00', '16:00:00', 'system', 'system'),
(5, 5, '08:00:00', '16:00:00', 'system', 'system'),
(5, 6, '08:00:00', '16:00:00', 'system', 'system'),
(5, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II MO OBROVNICA (ID 6)
(6, 1, '08:00:00', '16:00:00', 'system', 'system'),
(6, 2, '08:00:00', '16:00:00', 'system', 'system'),
(6, 3, '08:00:00', '16:00:00', 'system', 'system'),
(6, 4, '08:00:00', '16:00:00', 'system', 'system'),
(6, 5, '08:00:00', '16:00:00', 'system', 'system'),
(6, 6, '08:00:00', '16:00:00', 'system', 'system'),
(6, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO GORNJE PLAVNICE (ID 7)
(7, 1, '08:00:00', '16:00:00', 'system', 'system'),
(7, 2, '08:00:00', '16:00:00', 'system', 'system'),
(7, 3, '08:00:00', '16:00:00', 'system', 'system'),
(7, 4, '08:00:00', '16:00:00', 'system', 'system'),
(7, 5, '08:00:00', '16:00:00', 'system', 'system'),
(7, 6, '08:00:00', '16:00:00', 'system', 'system'),
(7, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO STARE PLAVNICE (ID 8)
(8, 1, '08:00:00', '16:00:00', 'system', 'system'),
(8, 2, '08:00:00', '16:00:00', 'system', 'system'),
(8, 3, '08:00:00', '16:00:00', 'system', 'system'),
(8, 4, '08:00:00', '16:00:00', 'system', 'system'),
(8, 6, '08:00:00', '16:00:00', 'system', 'system'),
(8, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II MO VELIKO KORENOVO (ID 9)
(9, 1, '08:00:00', '16:00:00', 'system', 'system'),
(9, 2, '08:00:00', '16:00:00', 'system', 'system'),
(9, 3, '08:00:00', '16:00:00', 'system', 'system'),
(9, 4, '08:00:00', '16:00:00', 'system', 'system'),
(9, 5, '08:00:00', '16:00:00', 'system', 'system'),
(9, 6, '08:00:00', '16:00:00', 'system', 'system'),
(9, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II MO TROJSTVENI MARKOVAC (ID 10)
(10, 1, '08:00:00', '16:00:00', 'system', 'system'),
(10, 2, '08:00:00', '16:00:00', 'system', 'system'),
(10, 3, '08:00:00', '16:00:00', 'system', 'system'),
(10, 4, '08:00:00', '16:00:00', 'system', 'system'),
(10, 5, '08:00:00', '16:00:00', 'system', 'system'),
(10, 6, '08:00:00', '16:00:00', 'system', 'system'),
(10, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II ŽDRALOVI (ID 11)
(11, 1, '08:00:00', '16:00:00', 'system', 'system'),
(11, 2, '08:00:00', '16:00:00', 'system', 'system'),
(11, 3, '08:00:00', '16:00:00', 'system', 'system'),
(11, 4, '08:00:00', '16:00:00', 'system', 'system'),
(11, 5, '08:00:00', '16:00:00', 'system', 'system'),
(11, 6, '08:00:00', '16:00:00', 'system', 'system'),
(11, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO PATKOVAC (ID 12)
(12, 1, '08:00:00', '16:00:00', 'system', 'system'),
(12, 2, '08:00:00', '16:00:00', 'system', 'system'),
(12, 3, '08:00:00', '16:00:00', 'system', 'system'),
(12, 4, '08:00:00', '16:00:00', 'system', 'system'),
(12, 5, '08:00:00', '16:00:00', 'system', 'system'),
(12, 6, '08:00:00', '16:00:00', 'system', 'system'),
(12, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- II MO PRGOMELJE (ID 13)
(13, 1, '08:00:00', '16:00:00', 'system', 'system'),
(13, 2, '08:00:00', '16:00:00', 'system', 'system'),
(13, 3, '08:00:00', '16:00:00', 'system', 'system'),
(13, 4, '08:00:00', '16:00:00', 'system', 'system'),
(13, 6, '08:00:00', '16:00:00', 'system', 'system'),
(13, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO CIGLENA (ID 14)
(14, 1, '08:00:00', '16:00:00', 'system', 'system'),
(14, 2, '08:00:00', '16:00:00', 'system', 'system'),
(14, 3, '08:00:00', '16:00:00', 'system', 'system'),
(14, 4, '08:00:00', '16:00:00', 'system', 'system'),
(14, 5, '08:00:00', '16:00:00', 'system', 'system'),
(14, 6, '08:00:00', '16:00:00', 'system', 'system'),
(14, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I KRIŽEVAČKA CESTA (ID 15)
(15, 1, '08:00:00', '16:00:00', 'system', 'system'),
(15, 2, '08:00:00', '16:00:00', 'system', 'system'),
(15, 3, '08:00:00', '16:00:00', 'system', 'system'),
(15, 4, '08:00:00', '16:00:00', 'system', 'system'),
(15, 5, '08:00:00', '16:00:00', 'system', 'system'),
(15, 6, '08:00:00', '16:00:00', 'system', 'system'),
(15, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I MO DR. ANTE STARČEVIĆ (ID 16)
(16, 1, '08:00:00', '22:00:00', 'system', 'system'),
(16, 2, '08:00:00', '22:00:00', 'system', 'system'),
(16, 3, '08:00:00', '22:00:00', 'system', 'system'),
(16, 4, '08:00:00', '22:00:00', 'system', 'system'),
(16, 5, '08:00:00', '22:00:00', 'system', 'system'),

-- II MO TOMAŠ (ID 17)
(17, 1, '08:00:00', '16:00:00', 'system', 'system'),
(17, 2, '08:00:00', '16:00:00', 'system', 'system'),
(17, 3, '08:00:00', '16:00:00', 'system', 'system'),
(17, 4, '08:00:00', '16:00:00', 'system', 'system'),
(17, 5, '08:00:00', '16:00:00', 'system', 'system'),
(17, 6, '08:00:00', '16:00:00', 'system', 'system'),
(17, 0, '08:00:00', '16:00:00', 'system', 'system'),

-- I BAN JOSIP JELAČIĆ (ID 18)
(18, 1, '08:00:00', '16:00:00', 'system', 'system'),
(18, 2, '08:00:00', '16:00:00', 'system', 'system'),
(18, 3, '08:00:00', '16:00:00', 'system', 'system'),
(18, 4, '08:00:00', '16:00:00', 'system', 'system'),
(18, 5, '08:00:00', '16:00:00', 'system', 'system'),
(18, 6, '08:00:00', '16:00:00', 'system', 'system'),
(18, 0, '08:00:00', '16:00:00', 'system', 'system');

