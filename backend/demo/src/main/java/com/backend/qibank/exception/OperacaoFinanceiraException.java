package com.backend.qibank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OperacaoFinanceiraException extends RuntimeException {
    public OperacaoFinanceiraException(String message) {
        super(message);
    }
}