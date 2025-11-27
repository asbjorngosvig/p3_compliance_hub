package com.compliancehub.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKey;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class JWTServiceTest {

    @InjectMocks
    private JWTService jwtService;

    @Test
    void generateTokenTest(){
        String subject = "testUser";
        String email = "test@test.com";
        String role = "ADMIN";

        String token = jwtService.generateToken(subject, email, role);
        SecretKey key = jwtService.getKey();

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        assertEquals(subject, claims.getSubject());
        assertEquals(email, claims.get("userEmail"));
        assertEquals(role, claims.get("role"));

    }

}

