package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class RegistrationConsumer {
    private final EmailSender emailSender;

    public RegistrationConsumer(EmailSender emailSender) {
        this.emailSender = emailSender;
    }

    @KafkaListener(topics = "registration", groupId = "registration_group")
    void listener(MessageDto message) {
        try {
            log.info("Received message [{}] in registration_group", message);
            emailSender.sendSimpleEmail(message);
            log.info("Sent message [{}] in registration_group", message);
        } catch (Exception e) {
            log.error(e.getMessage());
        }

    }
}
