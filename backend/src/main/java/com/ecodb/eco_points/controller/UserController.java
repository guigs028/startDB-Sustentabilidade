package com.ecodb.eco_points.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecodb.eco_points.dto.UpdateUserDTO;
import com.ecodb.eco_points.dto.UserResponseDTO;
import com.ecodb.eco_points.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/v1/usuarios")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails) {
                
        String email = userDetails.getUsername();        
        UserResponseDTO currentUser = userService.getUserByEmail(email);
        return ResponseEntity.ok(currentUser);
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponseDTO> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UpdateUserDTO updateUserDTO) {
        
        String email = userDetails.getUsername();
        UserResponseDTO updatedUser = userService.atualizarPerfil(email, updateUserDTO);
        return ResponseEntity.ok(updatedUser);
    }
}
