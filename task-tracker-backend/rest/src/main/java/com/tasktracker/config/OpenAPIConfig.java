package com.tasktracker.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {

    @Value("${server.port}")
    private String port;
    @Value("${server.ip}")
    private String host;

    @Bean
    public OpenAPI myOpenAPI() {
        Server server = new Server();
        server.setUrl("http://" + host + ":" + port);

        Info info = new Info()
                .title("Task Tracker API")
                .version("2.0");

        return new OpenAPI().info(info)
                .servers(List.of(server));
    }
}