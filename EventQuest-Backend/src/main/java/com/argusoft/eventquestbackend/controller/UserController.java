package com.argusoft.eventquestbackend.controller;

import com.argusoft.eventquestbackend.model.*;
import com.argusoft.eventquestbackend.service.EmailService;
import com.argusoft.eventquestbackend.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/users")
@CrossOrigin()
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Value("${jwt.secret}")
    private String jwtSecret;
    private static final long EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds


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

    private String generateJwtToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .compact();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User testUser){
        User user = userService.findByUsername(testUser.getUsername());
        //System.out.println(user);
        if( user != null){

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(testUser.getPassword(), user.getPassword())){
                //String token = generateJwtToken(testUser.getUsername());
                //System.out.println("token: " + token);
                LoginResponse loginResponse = new LoginResponse();
                loginResponse.setSuccess(true);
                loginResponse.setMessage("Login Successfully");
                //loginResponse.setToken(token);
                loginResponse.setUser(user);
                return ResponseEntity.ok(loginResponse);
            }
        }

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setSuccess(false);
        loginResponse.setMessage("Invalid Credentials");

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(loginResponse);
    }

    @GetMapping("/{username}")
    public User findByUsername(@RequestParam("username") String username){
        System.out.println("un find");
        return userService.findByUsername(username);
    }


    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestBody OtpData otpData){

        User user = userService.findByUsername(otpData.getEmail());
        OtpResponse otpResponse = new OtpResponse();
        otpResponse.setUser(user);
        if(user==null){
            otpResponse.setSuccess(false);
            otpResponse.setMessage("User not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(otpResponse);
        }
        otpResponse.setSuccess(true);
        otpResponse.setMessage("User found.");
        String toEmail = otpData.getEmail();
        String subject = "OTP from EventQuest";
        String content = "Your 6-digit OTP to reset password is " + otpData.getOtp();
        emailService.sendEmail(toEmail, subject, content);
        return ResponseEntity.ok(otpResponse);
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdateData updateData){
        System.out.println(updateData.getUsername());
        User user = userService.findByUsername(updateData.getUsername());
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(updateData.getPassword());
        user.setPassword(hashedPassword);
        userService.updateUser(user);
        UpdateResonse updateResonse = new UpdateResonse();
        updateResonse.setMessage("Password changed successfully");
        updateResonse.setSuccess(true);
        System.out.println("password changed to "+ updateData.getPassword());
        return ResponseEntity.ok(updateResonse);

    }

}
