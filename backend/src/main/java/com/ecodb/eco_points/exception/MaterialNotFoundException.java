package com.ecodb.eco_points.exception;

public class MaterialNotFoundException extends RuntimeException {
    public MaterialNotFoundException(Long materialId) {
        super("Material com ID " + materialId + " não encontrado");
    }

    public MaterialNotFoundException(String message) {
        super(message);
    }
}
