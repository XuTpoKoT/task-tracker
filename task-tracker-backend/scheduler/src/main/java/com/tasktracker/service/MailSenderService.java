package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MailSenderService {
    private final KafkaTemplate<String, MessageDto> kafkaTemplate;

    public MailSenderService(KafkaTemplate<String, MessageDto> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendMessage(MessageDto messageDto, String topicName) {
        log.info("Sending task report message to: {}", messageDto.email());
        log.info("--------------------------------");

        kafkaTemplate.send(topicName, messageDto);
    }
}
