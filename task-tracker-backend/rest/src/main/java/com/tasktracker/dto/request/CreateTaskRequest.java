package com.tasktracker.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CreateTaskRequest(
        @NotBlank(message = "Заголовок не может быть пустым")
        String header,
        String description) {
}
