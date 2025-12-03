package com.ecodb.eco_points.exception;

public class DescarteNotFoundException extends RuntimeException {
    public DescarteNotFoundException(Long id) {
        super("Descarte com ID " + id + " não encontrado.");
    }
}