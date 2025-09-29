package com.backend.qibank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT) // HTTP 409 Conflict
public class ClienteExistenteException extends RuntimeException {
    public ClienteExistenteException(String message) { super(message); }
}