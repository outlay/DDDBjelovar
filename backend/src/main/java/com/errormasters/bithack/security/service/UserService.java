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

import java.util.List;
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
        List<User> list = userRepository.findAll();
        if (!list.isEmpty()) {
            log.info("Users already present in database, cancelling default users creation");
        } else {
            SignupRequest signupRequestApp = new SignupRequest();
            signupRequestApp.setFirstName("ApplicantFirstName");
            signupRequestApp.setLastName("ApplicantLastName");
            signupRequestApp.setPassword("test");
            signupRequestApp.setEmail("test@applicant.com");

            addUser(signupRequestApp);

            SignupRequest signupRequestCity = new SignupRequest();
            signupRequestCity.setFirstName("CityFirstName");
            signupRequestCity.setLastName("CityLastName");
            signupRequestCity.setPassword("test");
            signupRequestCity.setEmail("test@city.com");

            addUserInternal(signupRequestCity, RoleEnum.ROLE_CITY_SERVICE.name());

            SignupRequest signupRequestJan = new SignupRequest();
            signupRequestJan.setFirstName("JanitorFirstName");
            signupRequestJan.setLastName("JanitorLastName");
            signupRequestJan.setPassword("test");
            signupRequestJan.setEmail("test@janitor.com");

            addUserInternal(signupRequestJan, RoleEnum.ROLE_JANITOR.name());

            SignupRequest signupRequestMayor = new SignupRequest();
            signupRequestMayor.setFirstName("MayorFirstName");
            signupRequestMayor.setLastName("MayorLastName");
            signupRequestMayor.setPassword("test");
            signupRequestMayor.setEmail("test@mayor.com");

            addUserInternal(signupRequestMayor, RoleEnum.ROLE_MAYOR.name());

            log.info("Added all default users");
        }
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
                .toList().getFirst();

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
