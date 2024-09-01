package com.tasktracker.repo;

import com.tasktracker.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TaskRepo extends JpaRepository<Task, UUID> {
    List<Task> findByUserId(Integer id);
}
