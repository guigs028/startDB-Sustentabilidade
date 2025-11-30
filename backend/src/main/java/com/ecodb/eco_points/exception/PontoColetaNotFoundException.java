package com.ecodb.eco_points.exception;

public class PontoColetaNotFoundException extends RuntimeException {
    public PontoColetaNotFoundException(Long pontoId) {
        super("Ponto de coleta com ID " + pontoId + " não encontrado");
    }

    public PontoColetaNotFoundException(String message) {
        super(message);
    }
}
