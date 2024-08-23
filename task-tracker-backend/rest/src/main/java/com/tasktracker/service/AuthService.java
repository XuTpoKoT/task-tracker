package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import com.tasktracker.dto.request.SignInRequest;
import com.tasktracker.dto.request.SignUpRequest;
import com.tasktracker.dto.response.JwtAuthenticationResponse;
import com.tasktracker.entity.AppUser;
import com.tasktracker.entity.SecurityUser;
import com.tasktracker.error.AccessForbiddenException;
import com.tasktracker.error.OccupiedEmailException;
import com.tasktracker.error.PasswordsDontMatchException;
import com.tasktracker.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailSenderService mailSenderService;

    public JwtAuthenticationResponse signUp(SignUpRequest req) {
        try {
            if (!Objects.equals(req.password(), req.repeatedPassword())) {
                throw new PasswordsDontMatchException();
            }
            AppUser appUser = new AppUser(req.email(), passwordEncoder.encode(req.password()));
            userRepo.save(appUser);
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    req.email(),
                    req.password()
            ));
            log.info("End authenticationManager.authenticate");
            MessageDto messageDto = MessageDto.builder()
                    .email(appUser.getEmail())
                    .title("TaskTracker registration")
                    .body("You have successfully signed up in Task Tracker!")
                    .build();
            mailSenderService.sendMessage(messageDto,"registration");
            return generateToken(appUser);
        } catch (DataIntegrityViolationException e) {
            throw new OccupiedEmailException("Email " + req.email() + " is occupied", e);
        }
    }

    public JwtAuthenticationResponse signIn(SignInRequest request) {
        log.info("Sign in called with email " + request.email());
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email(),
                request.password()
        ));
        log.info("End authenticationManager.authenticate");
        AppUser appUser = userRepo.findByEmail(request.email()).orElseThrow(AccessForbiddenException::new);
        return generateToken(appUser);
    }

    private JwtAuthenticationResponse generateToken(AppUser appUser) {
        SecurityUser securityUser = new SecurityUser(appUser);
        Map<String, Object> claims = Map.of("email", appUser.getEmail());
        log.info("Start gen token");
        String jwt = jwtService.generateToken(securityUser, claims);
        return new JwtAuthenticationResponse(jwt);
    }
}
