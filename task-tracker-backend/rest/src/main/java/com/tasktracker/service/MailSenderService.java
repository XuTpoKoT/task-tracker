package com.tasktracker.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailSenderService {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public MailSenderService(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(String message, String topicName) {
        log.info("Sending : {}", message);
        log.info("--------------------------------");

        kafkaTemplate.send(topicName, message);
    }
}
