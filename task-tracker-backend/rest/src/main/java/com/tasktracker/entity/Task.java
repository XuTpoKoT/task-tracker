package com.tasktracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@Getter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name = "user_id", nullable = false)
    @Setter
    private Integer userId;
    @Column(nullable = false)
    @Setter
    private String header;
    @Setter
    private String description;
    @Setter
    @Column(name = "is_done", nullable = false)
    private boolean isDone;
    @Column(name = "done_at")
    @Setter
    private ZonedDateTime doneAt;
}
