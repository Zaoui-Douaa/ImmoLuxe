package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Service.UserServiceImp;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

//@RestController
//@AllArgsConstructor
public class UserController {
   /* UserServiceImp userService ;
    @PostMapping("/user-add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User createdUser = userService.AddUser(user);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdUser.getIdUser())
                .toUri();
        return ResponseEntity.created(location).body(createdUser);
    }
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
*/
}
