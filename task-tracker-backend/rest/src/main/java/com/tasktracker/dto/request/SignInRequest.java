package com.tasktracker.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignInRequest(
        @NotBlank(message = "Email не может быть пустым")
        @Email
        String email,
        @NotBlank(message = "Пароль не может быть пустым")
        String password) {
}
