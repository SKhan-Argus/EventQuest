package com.argusoft.eventquestbackend.controller;

import com.argusoft.eventquestbackend.model.LoginResponse;
import com.argusoft.eventquestbackend.model.SignupResponse;
import com.argusoft.eventquestbackend.model.User;
import com.argusoft.eventquestbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user){
        SignupResponse signupResponse = new SignupResponse();

        if(userService.findByUsername(user.getUsername()) != null){
            signupResponse.setMessage("Username already exists");
            signupResponse.setSuccess(false);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(signupResponse);
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userService.addUser(user);
        signupResponse.setMessage("User added successfully");
        signupResponse.setSuccess(true);
        return ResponseEntity.ok(signupResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User testUser){
        User user = userService.findByUsername(testUser.getUsername());
        if( user != null){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(testUser.getPassword(), user.getPassword())){

                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setSuccess(true);
                loginResponse.setMessage("Login Successfully");
                return ResponseEntity.ok(loginResponse);
            }
        }
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setSuccess(false);
        loginResponse.setMessage("Invalid Credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
    }
}
