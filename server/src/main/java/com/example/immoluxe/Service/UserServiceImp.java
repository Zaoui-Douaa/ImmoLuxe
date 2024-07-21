package com.example.immoluxe.Service;

import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

//@AllArgsConstructor

public class UserServiceImp {/*
    UserRepository userRepo ;
    public User AddUser(User u){
        return userRepo.save(u) ;
    }
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
    public User getUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }


    public User updateUser(Long id, User user) {
        User u= userRepo.findById(id).orElse(null) ;
        return userRepo.save(u) ;

    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
    */
}
