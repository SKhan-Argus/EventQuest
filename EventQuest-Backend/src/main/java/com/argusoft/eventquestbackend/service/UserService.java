package com.argusoft.eventquestbackend.service;

import com.argusoft.eventquestbackend.model.User;
import com.argusoft.eventquestbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User addUser(User user){
        return userRepository.save(user);
    }

    public User findUserById(Long userId){
        return userRepository.findById(userId).orElse(null);
    }

    public User findByUsername(String username){
        return userRepository.findByUsername(username).orElse(null);
    }

    public User updateUser(User user){
        return userRepository.save(user);
    }
}
