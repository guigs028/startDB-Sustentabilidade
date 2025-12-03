package com.ecodb.eco_points.exception;

public class UsuarioNotFoundException extends RuntimeException{
    public UsuarioNotFoundException(String email) {
        super("Usuário com email " + email + " não encontrado");
    }
}
