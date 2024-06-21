package com.olos.contracthelperapi.contollers;

import com.olos.contracthelperapi.dto.AuthRequest;
import com.olos.contracthelperapi.dto.JwtResponse;
import com.olos.contracthelperapi.dto.RegisterRequest;
import com.olos.contracthelperapi.entities.User;
import com.olos.contracthelperapi.exceptions.authExceptions.InvalidTokenException;
import com.olos.contracthelperapi.repositories.UserRepository;
import com.olos.contracthelperapi.services.AuthService;
import com.olos.contracthelperapi.services.RefreshTokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;
    private static final Logger logger = LogManager.getLogger(AuthController.class);

    @Autowired
    public AuthController(AuthService authService, AuthenticationManager authenticationManager, RefreshTokenService refreshTokenService, UserRepository userRepository) {
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.refreshTokenService = refreshTokenService;
        this.userRepository = userRepository;
        logger.info("AuthController initialized");
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        logger.info("Registering new user: {}", registerRequest.username());
        User user = authService.registerUser(registerRequest);
        logger.info("User registered successfully: {}", user.getUsername());
        return ResponseEntity.ok(user);
    }


    @PostMapping("/token")
    public ResponseEntity<JwtResponse> getToken(@RequestBody AuthRequest authRequest) {
        logger.info("Authenticating user: {}", authRequest.username());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User user = userRepository.findByUsername(authRequest.username())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        logger.info("UserDetails: {}", user);

        refreshTokenService.findByUserId(user.getUserId())
                .map(refreshTokenService::updateRefreshToken)
                .orElseGet(() -> refreshTokenService.createRefreshToken(user.getUserId()));

        String accessToken = authService.generateToken(userDetails);
        logger.info("Token generated for user: {}", authRequest.username());
        return ResponseEntity.ok(new JwtResponse(accessToken));
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponse> refreshAccessToken(@RequestHeader("Authorization") String bearerToken) {
        logger.info("Refreshing access token");
        JwtResponse jwtResponse = authService.refreshAccessToken(bearerToken);
        logger.info("Access token refreshed");
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/validateToken")
    public ResponseEntity<?> validateToken(@RequestBody JwtResponse token) {
        try {
            logger.info("Validating token");
            authService.validateToken(token.accessToken());
            logger.info("Token validated successfully");
            return ResponseEntity.ok().build();
        } catch (InvalidTokenException e) {
            logger.error("Token validation failed", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String bearerToken) {
        logger.info("Logging out user");
        try {
            authService.logout(bearerToken);
            logger.info("User logged out successfully");
            return ResponseEntity.ok("Logged out successfully.");
        } catch (ResponseStatusException e) {
            logger.error("Logout failed", e);
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }
}

