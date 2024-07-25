package com.tasktracker.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignUpRequest(
        @NotBlank(message = "Email не может быть пустым")
        @Email
        String email,
        @NotBlank(message = "Пароль не может быть пустым")
        @Size(min = 3, max = 20, message = "Длина пароля от 3 до 20 символов")
        String password,
        @NotBlank(message = "Пароль не может быть пустым")
        @Size(min = 3, max = 20, message = "Длина пароля от 3 до 20 символов")
        String repeatedPassword) {
}
