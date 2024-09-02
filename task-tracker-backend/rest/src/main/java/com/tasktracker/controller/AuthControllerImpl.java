package com.tasktracker.controller;

import com.tasktracker.dto.request.SignInRequest;
import com.tasktracker.dto.request.SignUpRequest;
import com.tasktracker.dto.response.JwtAuthenticationResponse;
import com.tasktracker.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthControllerImpl implements AuthController {
    private final AuthService authService;

    public AuthControllerImpl(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public JwtAuthenticationResponse signUp(@Valid @RequestBody SignUpRequest req) {
        return authService.signUp(req);
    }

    @Override
    public JwtAuthenticationResponse signIn(@Valid @RequestBody SignInRequest request) {
        return authService.signIn(request);
    }
}
