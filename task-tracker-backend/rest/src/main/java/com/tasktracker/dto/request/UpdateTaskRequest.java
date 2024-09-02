package com.tasktracker.dto.request;

import com.tasktracker.validation.UpdateTaskConstraint;

@UpdateTaskConstraint(message = "Header or isDone must not be empty")
public record UpdateTaskRequest(
        String header,
        String description,
        Boolean isDone) {
}
