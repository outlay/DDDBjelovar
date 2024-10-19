package com.errormasters.bithack.security.mapper;

import com.errormasters.bithack.security.entity.User;
import com.errormasters.bithack.security.entity.dto.request.SignupRequest;
import com.errormasters.bithack.security.entity.dto.response.UserResponse;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    UserResponse mapToResponse(User user);
}
