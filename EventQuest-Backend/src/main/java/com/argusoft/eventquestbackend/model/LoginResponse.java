package com.argusoft.eventquestbackend.model;

import lombok.Data;

@Data
public class LoginResponse {
    private boolean success;
    private String message;
    //private String token;
    private User user;
}
