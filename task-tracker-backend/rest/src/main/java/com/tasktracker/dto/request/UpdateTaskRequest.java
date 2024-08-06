package com.tasktracker.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UpdateTaskRequest(
        @NotBlank(message = "Заголовок не может быть пустым")
        String header,
        String description,
        boolean isDone) {
}
