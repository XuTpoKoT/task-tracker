package com.tasktracker.service;

import com.tasktracker.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailSender {
    public final JavaMailSender emailSender;
    @Value("${spring.mail.username}")
    public String emailFrom;

    public EmailSender(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public void sendSimpleEmail(MessageDto message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(emailFrom);
        simpleMailMessage.setTo(message.email());
        simpleMailMessage.setSubject(message.title());
        simpleMailMessage.setText(message.body());
        emailSender.send(simpleMailMessage);
    }
}
