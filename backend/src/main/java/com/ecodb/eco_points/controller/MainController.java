package com.ecodb.eco_points.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MainController {
    
    // get 
    @GetMapping("/status")
    public String checkStatus() {
        return "O sistema EcoPoints está rodando corretamente!";
    }
    
}
