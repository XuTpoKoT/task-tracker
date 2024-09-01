package com.tasktracker.dto;

import lombok.Builder;

@Builder
public record MessageDto(String email, String title, String body) {
}
