package com.compliancehub.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@org.springframework.stereotype.Controller
@RestController
public class testController {
    @RequestMapping(path = "/test")
    public String request() {
        return "THIS IS A CONNECTION TEST";
    }
}
