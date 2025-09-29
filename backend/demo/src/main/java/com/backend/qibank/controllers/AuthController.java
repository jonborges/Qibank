package com.backend.qibank.controllers;

import com.backend.qibank.data.dto.ClienteResponseDTO;
import com.backend.qibank.data.dto.LoginRequestDTO;
import com.backend.qibank.model.Cliente;
import com.backend.qibank.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/login")
    public ResponseEntity<ClienteResponseDTO> login(@RequestBody LoginRequestDTO loginDTO) {
        Cliente cliente = clienteService.login(loginDTO.getEmail(), loginDTO.getPassword());
        return ResponseEntity.ok(new ClienteResponseDTO(cliente));
    }
}