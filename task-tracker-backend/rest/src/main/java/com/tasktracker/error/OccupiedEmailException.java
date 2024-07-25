package com.tasktracker.error;

public class OccupiedEmailException extends RuntimeException {
    public OccupiedEmailException(String message, Throwable cause) {
        super(message, cause);
    }
}
