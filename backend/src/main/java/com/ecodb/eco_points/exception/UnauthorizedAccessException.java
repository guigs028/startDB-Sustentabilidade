package com.ecodb.eco_points.exception;

public class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException(String message) {
        super(message);
    }

    public UnauthorizedAccessException() {
        super("Você não tem permissão para realizar esta operação");
    }
}
