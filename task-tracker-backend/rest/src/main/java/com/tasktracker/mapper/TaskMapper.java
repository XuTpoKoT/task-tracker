package com.tasktracker.mapper;

import com.tasktracker.dto.request.CreateTaskRequest;
import com.tasktracker.dto.response.TaskResponse;
import com.tasktracker.entity.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    @Mapping(target = "header", source = "request.header")
    @Mapping(target = "description", source = "request.description")
    @Mapping(target = "userId", source = "userId")
    Task dtoToTask(CreateTaskRequest request, Integer userId);

    @Mapping(target = "isDone", source = "done")
    TaskResponse taskToDto(Task task);

    List<TaskResponse> tasksToDto(List<Task> task);
}
