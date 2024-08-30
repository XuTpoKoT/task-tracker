package com.tasktracker.validation;

import com.tasktracker.dto.request.UpdateTaskRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UpdateTaskValidator implements ConstraintValidator<UpdateTaskConstraint, UpdateTaskRequest> {
    @Override
    public boolean isValid(UpdateTaskRequest dto, ConstraintValidatorContext context) {
        if (dto.header() != null) {
            return !dto.header().isBlank();
        }
        return dto.isDone() != null;
    }
}
