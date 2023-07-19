package com.argusoft.eventquestbackend.model;

import lombok.Data;

@Data
public class OtpResponse {
    private boolean success;
    private String message;
    private User user;

}
