package com.argusoft.eventquestbackend.controller;

import com.argusoft.eventquestbackend.model.LoginResponse;
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
    public ResponseEntity<?> signup(@RequestParam("username") String username,
                                         @RequestParam("password") String password){

        if(userService.findByUsername(username) != null){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }

        User user = new User();
        user.setUsername(username);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(password);
        user.setPassword(hashedPassword);
        userService.addUser(user);
        return ResponseEntity.ok("Signup Successfully");
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
