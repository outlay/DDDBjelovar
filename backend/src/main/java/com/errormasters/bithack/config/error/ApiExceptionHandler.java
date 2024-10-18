package com.errormasters.bithack.config.error;

import com.errormasters.bithack.common.exception.BithackException;
import com.errormasters.bithack.common.exception.ValidationException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<ApplicationError> handleAnyException(Exception e) {
        log.error("An error occurred: ", e);
        var applicationError = new ApplicationError(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Došlo je do interne greške na serveru!",
                e.getClass().getName(), LocalDateTime.now(), null);

        return ResponseEntity.internalServerError().body(applicationError);
    }

    @ExceptionHandler(BithackException.class)
    public final ResponseEntity<ApplicationError> handleAnyCustomException(BithackException e) {
        log.error("Unhandled custom exception occured: ", e);
        var applicationError = new ApplicationError(
                e.getStatusCode().value(), e.getMessage(),
                e.getClass().getName(), LocalDateTime.now(), null);

        return ResponseEntity.status(e.getStatusCode()).body(applicationError);
    }

    @ExceptionHandler(ValidationException.class)
    public final ResponseEntity<ApplicationError> handleValidationException(ValidationException e) {
        log.error("Unhandled validation error occurred", e);
        var applicationError = new ApplicationError(
                e.getStatusCode().value(), e.getMessage(),
                e.getClass().getName(), LocalDateTime.now(), List.of(e.getFieldError()));

        return ResponseEntity.status(e.getStatusCode()).body(applicationError);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException ex) {
        var errors = ex.getConstraintViolations()
                .stream()
                .map(violation -> new FieldError(violation.getPropertyPath().toString(), violation.getMessage()))
                .toList();

        var apiError = new ApplicationError(
                HttpStatus.BAD_REQUEST.value(), "Nađene su validacijske greške!",
                ex.getClass().getName(), LocalDateTime.now(), errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(apiError);
    }

    @SuppressWarnings("NullableProblems")
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        var errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new FieldError(error.getField(), error.getDefaultMessage()))
                .toList();

        var applicationError = new ApplicationError(
                status.value(), "Nađene su validacijske greške!",
                ex.getClass().getName(), LocalDateTime.now(), errors);
        return ResponseEntity.status(status).body(applicationError);
    }
}
