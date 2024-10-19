package com.errormasters.bithack.security.api;

import com.errormasters.bithack.security.entity.dto.request.LoginRequest;
import com.errormasters.bithack.security.entity.dto.request.SignupRequest;
import com.errormasters.bithack.security.entity.dto.response.JwtResponse;
import com.errormasters.bithack.security.entity.dto.response.SignupResponse;
import com.errormasters.bithack.security.exception.UserAlreadyExistsException;
import com.errormasters.bithack.security.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController implements UserApi {

    private final UserService userService;

    @Override
    public ResponseEntity<JwtResponse> authenticateUser(LoginRequest loginRequest) {
        log.info("Authenticating user");

        return ResponseEntity.ok(userService.authenticateUser(loginRequest));
    }

    @Override
    public ResponseEntity<SignupResponse> addUser(SignupRequest signupRequest) {
        log.info("Adding user");

        if (userService.userExistsByEmail(signupRequest.getEmail())) {
            log.info("Adding user failed cause this email already exists in the database");
            throw new UserAlreadyExistsException("Korisnik s unesenim e-mailom već postoji");
        } else {
            Long userId = userService.addUser(signupRequest);
            log.info("Added user with id {}", userId);
            return ResponseEntity.status(201).body(new SignupResponse(userId));
        }
    }
}