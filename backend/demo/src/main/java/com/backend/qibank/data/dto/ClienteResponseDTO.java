package com.backend.qibank.data.dto;

import com.backend.qibank.model.Cliente;
import java.math.BigDecimal;

public class ClienteResponseDTO {
    private String id;
    private String nome;
    private String email;
    private BigDecimal saldo;

    public ClienteResponseDTO(Cliente cliente) {
        this.id = cliente.getId();
        this.nome = cliente.getNome();
        this.email = cliente.getEmail();
        this.saldo = cliente.getSaldo();
    }

    public String getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }
}