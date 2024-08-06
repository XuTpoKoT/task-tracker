package com.tasktracker.controller;

import com.tasktracker.dto.request.SignInRequest;
import com.tasktracker.dto.request.SignUpRequest;
import com.tasktracker.dto.response.JwtAuthenticationResponse;
import com.tasktracker.error.ErrorDescription;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Tag(name = "auth")
@RequestMapping("/${api-version}/auth")
public interface AuthController {
    @Operation(summary = "Регистрация")
    @ApiResponses({
            @ApiResponse(responseCode = "201", content = { @Content(schema = @Schema()) }),
            @ApiResponse(
                    responseCode = "400",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    JwtAuthenticationResponse signUp(@RequestBody SignUpRequest signUpRequest) throws Exception;

    @Operation(summary = "Авторизация")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema()) }),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @PostMapping("/sign-in")
    JwtAuthenticationResponse signIn(@RequestBody SignInRequest request);
}
