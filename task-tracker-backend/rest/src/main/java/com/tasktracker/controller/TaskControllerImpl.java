package com.tasktracker.controller;

import com.tasktracker.dto.request.CreateTaskRequest;
import com.tasktracker.dto.request.UpdateTaskRequest;
import com.tasktracker.dto.response.TaskResponse;
import com.tasktracker.entity.AppUser;
import com.tasktracker.entity.Task;
import com.tasktracker.mapper.TaskMapper;
import com.tasktracker.repo.TaskRepo;
import com.tasktracker.util.SecurityUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TaskControllerImpl implements TaskController {
    private final TaskRepo taskRepo;
    private final TaskMapper taskMapper;
    @Override
    public void addTask(CreateTaskRequest request) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        taskRepo.save(taskMapper.dtoToTask(request, appUser.getId()));
    }

    @Override
    public List<TaskResponse> getAllTasks() {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        return taskMapper.tasksToDto(taskRepo.findByUserId(appUser.getId()));
    }

    @Override
    public TaskResponse getTask(UUID taskId) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        Task task = taskRepo.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task " + taskId + " not found"));
        if (!Objects.equals(task.getUserId(), appUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        return taskMapper.taskToDto(task);
    }

    @Override
    public void deleteTask(UUID taskId) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        Task task = taskRepo.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task " + taskId + " not found"));
        if (!Objects.equals(task.getUserId(), appUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        taskRepo.delete(task);
    }

    @Override
    public void updateTask(UUID taskId, UpdateTaskRequest request) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        Task task = taskRepo.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task " + taskId + " not found"));
        if (!Objects.equals(task.getUserId(), appUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        task.setHeader(request.header());
        task.setDescription(request.description());
        task.setDone(request.isDone());
        taskRepo.save(task);
    }
}
