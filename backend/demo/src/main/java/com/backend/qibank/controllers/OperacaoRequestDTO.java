package com.backend.qibank.controllers;

import java.math.BigDecimal;

public class OperacaoRequestDTO {

    private BigDecimal valor;

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
}