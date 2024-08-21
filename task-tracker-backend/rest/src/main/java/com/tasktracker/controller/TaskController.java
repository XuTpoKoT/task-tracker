package com.tasktracker.controller;

import com.tasktracker.dto.request.CreateTaskRequest;
import com.tasktracker.dto.request.UpdateTaskRequest;
import com.tasktracker.dto.response.TaskResponse;
import com.tasktracker.error.ErrorDescription;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "tasks")
@RequestMapping("/${api-version}/tasks")
public interface TaskController {

    @Operation(summary = "Создание новой задачи")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = TaskResponse.class)))}),
            @ApiResponse(
                    responseCode = "400",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    TaskResponse addTask(@RequestBody CreateTaskRequest request);

    @Operation(summary = "Получение всех задач пользователя")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = TaskResponse.class)))}),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @GetMapping()
    List<TaskResponse> getAllTasks();

    @Operation(summary = "Получение детальной информации о задаче")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = TaskResponse.class))}),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "403",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "404",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @GetMapping("/{taskId}")
    TaskResponse getTask(@PathVariable UUID taskId);

    @Operation(summary = "Удаление задачи")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200"),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "403",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "404",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @DeleteMapping("/{taskId}")
    void deleteTask(@PathVariable UUID taskId);

    @Operation(summary = "Изменение описания задачи")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200"),
            @ApiResponse(
                    responseCode = "400",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "401",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "403",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "404",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))}),
            @ApiResponse(
                    responseCode = "503",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ErrorDescription.class))})
    })
    @PatchMapping("/{taskId}")
    TaskResponse updateTask(@PathVariable UUID taskId, @RequestBody UpdateTaskRequest request);
}
