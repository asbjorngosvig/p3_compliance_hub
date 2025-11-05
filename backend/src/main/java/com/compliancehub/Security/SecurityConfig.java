package com.compliancehub.Security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Configure authentication
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/", "/login").permitAll()  // Allow unauthenticated access to login, home, etc.
                                .anyRequest().authenticated()  // Secure all other routes
                )
                .formLogin(formLogin ->
                        formLogin
                                .loginPage("/login")  // Custom login page
                                .permitAll()  // Allow anyone to access the login page
                )
                .logout(logout ->
                        logout
                                .permitAll()  // Allow anyone to logout
                );

        return http.build();  // Return the SecurityFilterChain object
    }

    // Configure password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Use BCrypt for password hashing
    }

    // Configure AuthenticationManager (optional)
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder authenticationManagerBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authenticationManagerBuilder
                .inMemoryAuthentication()
                .withUser(User.builder().username("user").password(passwordEncoder().encode("password")).roles("USER").build());

        return authenticationManagerBuilder.build();
    }
}
