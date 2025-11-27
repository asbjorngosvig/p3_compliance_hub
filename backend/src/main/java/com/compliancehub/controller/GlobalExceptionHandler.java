package com.compliancehub.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({NoSuchElementException.class})
    public ResponseEntity<Void> handleNotFound() {
        return ResponseEntity.notFound().build();
    }
}
