package com.errormasters.bithack.common;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Constants {
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Api {
        public static final String V1 = "/api/v1";

        public static final String HOUSES = "/community-houses";

        public static final String USERS = "/users";

        public static final String LOGIN = "/login";
    }

}
