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

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class TaskControllerImpl implements TaskController {
    private final TaskRepo taskRepo;
    private final TaskMapper taskMapper;
    @Override
    public TaskResponse addTask(CreateTaskRequest request) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        Task task = taskRepo.save(taskMapper.dtoToTask(request, appUser.getId()));
        return taskMapper.taskToDto(task);
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
    public TaskResponse updateTask(UUID taskId, UpdateTaskRequest request) {
        AppUser appUser = SecurityUtils.getSecurityUser().getAppUser();
        Task task = taskRepo.findById(taskId).orElseThrow(() ->
                new EntityNotFoundException("Task " + taskId + " not found"));
        if (!Objects.equals(task.getUserId(), appUser.getId())) {
            throw new AccessDeniedException("Access denied");
        }
        if (request.header() != null) {
            task.setHeader(request.header());
        }
        if (request.description() != null) {
            task.setHeader(request.description());
        }
        if (request.isDone() != null) {
            task.setDone(request.isDone());
            if (request.isDone()) {
                task.setDoneAt(ZonedDateTime.now().withZoneSameLocal(ZoneId.of("UTC")));
            }
        }
        Task updatedTask = taskRepo.save(task);
        return taskMapper.taskToDto(updatedTask);
    }
}
