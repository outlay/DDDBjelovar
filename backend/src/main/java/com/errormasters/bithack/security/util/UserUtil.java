package com.errormasters.bithack.security.util;

import com.errormasters.bithack.security.entity.pojo.DashboardUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserUtil {

    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            if (authentication.getPrincipal() instanceof DashboardUserDetails userDetails) {
                return userDetails.getEmail();
            }
        }
        return null;
    }
}
