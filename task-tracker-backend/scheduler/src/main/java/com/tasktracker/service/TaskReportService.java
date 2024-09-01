package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import com.tasktracker.entity.AppUser;
import com.tasktracker.entity.Task;
import com.tasktracker.repo.TaskRepo;
import com.tasktracker.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
@Slf4j
public class TaskReportService {
    private final UserRepo userRepo;
    private final TaskRepo taskRepo;
    private final MailSenderService mailSenderService;

    @Scheduled(timeUnit = TimeUnit.MINUTES, fixedRateString = "${task-report-interval-in-minutes}")
    public void sendTaskReports() {
        log.info("Sending task reports");
        ZonedDateTime borderTimeStamp = ZonedDateTime.from(LocalDateTime.now().minusDays(1)
                .atZone(ZoneId.of("UTC")));
        List<AppUser> users = userRepo.findAll();
        for (AppUser user: users) {
            List<Task> tasks = taskRepo.findByUserId(user.getId());
            List<Task> undoneTasks = tasks.stream().filter(task -> !task.isDone()).toList();
            List<Task> doneTasks = tasks.stream().filter(task -> task.isDone() &&
                            task.getDoneAt().isAfter(borderTimeStamp)).toList();
            String taskReport = getTaskReport(undoneTasks, doneTasks);
            log.info(taskReport);
            MessageDto messageDto = MessageDto.builder()
                    .email(user.getEmail())
                    .title("TaskTracker report")
                    .body(taskReport)
                    .build();
            mailSenderService.sendMessage(messageDto,"tasks");
        }
    }

    private String getTaskReport(List<Task> undoneTasks, List<Task> doneTasks) {
        String undoneTasksMessage = undoneTasks.isEmpty() ? "You dont have undone tasks.\n"
                : "You have " + undoneTasks.size() + " undone tasks:\n" +
                undoneTasks.stream()
                        .limit(5)
                        .map(Task::getHeader)
                        .collect(Collectors.joining("\n"));
        String doneTasksMessage = doneTasks.isEmpty() ? "\nYou dont have done tasks today."
                : "You have " + doneTasks.size() + " done tasks today:\n" +
                doneTasks.stream()
                        .limit(5)
                        .map(Task::getHeader)
                        .collect(Collectors.joining("\n"));
        return undoneTasksMessage + doneTasksMessage;
    }
}
