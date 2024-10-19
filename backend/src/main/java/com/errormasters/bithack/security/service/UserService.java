package com.errormasters.bithack.security.service;

import com.errormasters.bithack.security.entity.User;
import com.errormasters.bithack.security.entity.dto.request.LoginRequest;
import com.errormasters.bithack.security.entity.dto.request.SignupRequest;
import com.errormasters.bithack.security.entity.dto.response.JwtResponse;
import com.errormasters.bithack.security.entity.dto.response.UserResponse;
import com.errormasters.bithack.security.entity.pojo.DashboardUserDetails;
import com.errormasters.bithack.security.entity.pojo.JwtGenerationResult;
import com.errormasters.bithack.security.entity.pojo.RoleEnum;
import com.errormasters.bithack.security.exception.SavingUserFailedException;
import com.errormasters.bithack.security.repository.UserRepository;
import com.errormasters.bithack.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    private final PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    protected void addDefaultUsers() {
        Optional<User> userApplicant = userRepository.findByEmail("test@applicant.com");

        if (userApplicant.isPresent()) {
            User user = userApplicant.get();
            if (user.getPassword().equals("test")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }
        Optional<User> userCityService = userRepository.findByEmail("test@city.com");
        if (userCityService.isPresent()) {
            User user = userCityService.get();
            if (user.getPassword().equals("test")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }
        Optional<User> userJanitor= userRepository.findByEmail("test@janitor.com");
        if (userJanitor.isPresent()) {
            User user = userJanitor.get();
            if (user.getPassword().equals("test")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }
        Optional<User> userMayor = userRepository.findByEmail("test@mayor.com");
        if (userMayor.isPresent()) {
            User user = userMayor.get();
            if (user.getPassword().equals("test")) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
            }
        }

        log.info("Added all default users in the database");
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        JwtGenerationResult accessResult = jwtUtil.generateToken(loginRequest.getEmail(), "access");

        String accessToken = accessResult.getToken();
        Long accessExpiry = accessResult.getTimestamp();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        DashboardUserDetails userDetails = (DashboardUserDetails) authentication.getPrincipal();

        String role = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                .findFirst().orElse(null);

        log.info("User login information: [Id: {}, Role: {}]", userDetails.getId(), role);

        return new JwtResponse(accessToken, accessExpiry,
                new UserResponse(userDetails.getId(), userDetails.getFirstName(), userDetails.getLastName(), userDetails.getEmail(), role));
    }

    public boolean userExistsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Long addUser(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole(RoleEnum.ROLE_APPLICANT.name());

        userRepository.save(user);
        Optional<User> savedUser = userRepository.findByEmail(signupRequest.getEmail());
        if (savedUser.isPresent()) {
            return savedUser.get().getId();
        } else {
            throw new SavingUserFailedException(HttpStatus.INTERNAL_SERVER_ERROR, "Spremanje korisnika sa email-om " + signupRequest.getEmail() + " nije bilo uspješno!");
        }
    }

    private Long addUserInternal(SignupRequest signupRequest, String role) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setFirstName(signupRequest.getFirstName());
        user.setLastName(signupRequest.getLastName());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setRole(role);

        userRepository.save(user);
        Optional<User> savedUser = userRepository.findByEmail(signupRequest.getEmail());
        return savedUser.map(User::getId).orElse(null);
    }

}
