package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TaskReportConsumer {
    private final EmailSender emailSender;

    public TaskReportConsumer(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    @KafkaListener(topics = "tasks", groupId = "tasks_group")
    void listener(MessageDto message) {
        try {
            log.info("Received message [{}] in tasks_group", message);
            emailSender.sendSimpleEmail(message);
            log.info("Sent message [{}] in tasks_group", message);
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
