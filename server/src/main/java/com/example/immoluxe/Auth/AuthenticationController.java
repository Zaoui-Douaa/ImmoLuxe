package com.example.immoluxe.Auth;

//import jakarta.mail.MessagingException;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;

//import java.io.UnsupportedEncodingException;

//@RestController
//@RequestMapping("/api/v1/auth")
//@RequiredArgsConstructor
public class AuthenticationController {
    /*
    private final AuthenticationService service;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request, HttpServletRequest httpServletRequest
    ) throws MessagingException, UnsupportedEncodingException, UnsupportedEncodingException {
        String siteURL = getSiteURL(httpServletRequest);
        return ResponseEntity.ok(service.register(request, siteURL));
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("code") String code) {
        if (service.verifyUser(code)) {
            return ResponseEntity.ok("Verification successful. You can now log in.");
        } else {
            return ResponseEntity.badRequest().body("Verification failed. Invalid token.");
        }
    }

    private String getSiteURL(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request)) ;
    }

     */
}
