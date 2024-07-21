package com.example.immoluxe.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.websocket.Decoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


public class JwtService {
    private static final String SECRET_KEY="yIiqewm3ugZKdrlFyI2YXO7/G8jP2n4iBQ/NPKPi4veNG8t7uYLHiU+q3n2kLfLw";
            ;
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims=extractClaims(token) ;
        return claimsResolver.apply(claims);
    }
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    public String generateToken(Map<String, Object> extraClaims,
                                UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
                .signWith(SignatureAlgorithm.HS256, getSignInKey()).compact() ;
    }
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username=extractUserName(token);
        return (username.equals(userDetails.getUsername()))&&isTokenExpired(token) ;
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()) ;
    }

    private Date extractExpiration(String token) {
      return extractClaim(token, Claims::getExpiration);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(getSignInKey()).parseClaimsJws(token).getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes= Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
