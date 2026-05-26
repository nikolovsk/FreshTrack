package com.freshtrack.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
public class GroceryItemAccessDeniedException extends RuntimeException {

    public GroceryItemAccessDeniedException() {
        super("You do not have access to this grocery item");
    }
}
