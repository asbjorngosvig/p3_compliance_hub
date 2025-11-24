package com.compliancehub;

import com.compliancehub.model.Admin;
import com.compliancehub.model.User;
import com.compliancehub.repository.UserRepository;
import com.compliancehub.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ComplianceHub {
    public static void main(String[] args) {
        SpringApplication.run(ComplianceHub.class, args);
    }


}