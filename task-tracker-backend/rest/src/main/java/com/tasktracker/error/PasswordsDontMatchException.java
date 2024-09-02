package com.tasktracker.error;

public class PasswordsDontMatchException extends RuntimeException {
    public PasswordsDontMatchException() {
        super("Пароли не совпадают!");
    }
}
