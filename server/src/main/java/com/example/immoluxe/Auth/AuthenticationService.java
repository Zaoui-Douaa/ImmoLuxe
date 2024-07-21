package com.example.immoluxe.Auth;

import com.example.immoluxe.Entity.Role;
import com.example.immoluxe.Entity.User;
import com.example.immoluxe.Repository.UserRepository;
import com.example.immoluxe.Service.JwtService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;
import java.util.UUID;

//@Service
//RequiredArgsConstructor

public class AuthenticationService {/*
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationResponse register(RegisterRequest request,String siteURL) throws MessagingException, UnsupportedEncodingException {

        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.user)
                .verified(false)
                .verificationToken(UUID.randomUUID().toString())
                .build();
        userRepository.save(user);
        emailService.sendVerificationEmail(user, siteURL);

        var jwtToken=jwtService.generateToken(user) ;


        return AuthenticationResponse.builder().token(jwtToken).build();

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request)
    {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + request.getEmail()));
        var jwtToken=jwtService.generateToken(user) ;
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
    public boolean verifyUser(String verificationToken) {
        Optional<User> userOptional = userRepository.findByVerificationToken(verificationToken);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setVerificationToken(null);
            user.setVerified(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }
*/
}
