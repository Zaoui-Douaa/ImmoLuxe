package com.example.immoluxe;

import com.example.immoluxe.Config.ApplicationAuditAware;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;



@EnableJpaAuditing(auditorAwareRef = "auditorAware")
@EnableAsync
@SpringBootApplication
public class ImmoLuxeApplication {

    public static void main(String[] args) {
        SpringApplication.run(ImmoLuxeApplication.class, args);

    }
}
