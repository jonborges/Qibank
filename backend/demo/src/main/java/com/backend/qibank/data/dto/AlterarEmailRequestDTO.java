package com.backend.qibank.data.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AlterarEmailRequestDTO {
    @NotBlank(message = "O novo e-mail não pode ser vazio")
    @Email(message = "Formato de e-mail inválido")
    private String novoEmail;

    public String getNovoEmail() {
        return novoEmail;
    }
}