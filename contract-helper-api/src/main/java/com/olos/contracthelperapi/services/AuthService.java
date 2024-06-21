package com.olos.contracthelperapi.services;

import com.olos.contracthelperapi.dto.JwtResponse;
import com.olos.contracthelperapi.dto.RegisterRequest;
import com.olos.contracthelperapi.entities.RefreshToken;
import com.olos.contracthelperapi.entities.Role;
import com.olos.contracthelperapi.entities.User;
import com.olos.contracthelperapi.exceptions.authExceptions.InvalidTokenException;
import com.olos.contracthelperapi.exceptions.authExceptions.RegistrationException;
import com.olos.contracthelperapi.exceptions.roleExceptions.RoleNotFoundException;
import com.olos.contracthelperapi.repositories.RoleRepository;
import com.olos.contracthelperapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final RefreshTokenService refreshTokenService;
    private static final Logger logger = LogManager.getLogger(AuthService.class);

    @Autowired
    public AuthService(JwtService jwtService, UserDetailsService userDetailsService,
                       UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository, RefreshTokenService refreshTokenService) {
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.refreshTokenService = refreshTokenService;

        logger.info("AuthService initialized");
    }

    public String generateToken(UserDetails userDetails) {
        logger.info("Generating token for user: {}", userDetails.getUsername());
        return jwtService.generateToken(userDetails);
    }

    public String extractUsername(String token) {
        logger.info("Extracting username from token");
        return jwtService.extractUsernameWithoutValidation(token);
    }

    public void validateToken(String token) throws InvalidTokenException {
        logger.info("Validating token");
        UserDetails userDetails = userDetailsService.loadUserByUsername(this.extractUsername(token));
        if (!jwtService.validateToken(token, userDetails)) {
            logger.error("Invalid token for user: {}", userDetails.getUsername());
            throw new InvalidTokenException("Invalid token");
        }
        logger.info("Token validated successfully for user: {}", userDetails.getUsername());
    }

    public User registerUser(RegisterRequest registerRequest) {
        logger.info("Registering user: {}", registerRequest.username());
        if (userRepository.existsByUsername(registerRequest.username()) || userRepository.existsByEmail(registerRequest.email())) {
            logger.error("Registration error: Username or email already exists.");
            throw new RegistrationException("Username or email already exists.");
        }

        User user = new User();
        user.setUsername(registerRequest.username());
        user.setPassword(passwordEncoder.encode(registerRequest.password()));
        user.setEmail(registerRequest.email());

        Role role = roleRepository.findByName(registerRequest.roleName())
                .orElseThrow(() -> new RoleNotFoundException(registerRequest.roleName()));
        user.setRole(role);

        User registeredUser = userRepository.save(user);
        logger.info("User registered successfully: {}", registeredUser.getUsername());
        return registeredUser;
    }

    public UserDetails loadUserByUsername(String username) {
        return userDetailsService.loadUserByUsername(username);
    }

    public JwtResponse refreshAccessToken(String bearerToken) {
        logger.info("Refreshing access token");
        if (!bearerToken.startsWith("Bearer ")) {
            logger.error("Incorrect Authorization header format.");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect Authorization header format.");
        }

        String onlyBearerToken = bearerToken.substring(7);
        String username = extractUsername(onlyBearerToken);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        logger.info("UserDetails: {}", user);

        RefreshToken existingRefreshToken = refreshTokenService.findByUserId(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Refresh Token not found"));

        refreshTokenService.verifyExpiration(existingRefreshToken);

        UserDetails userDetails = loadUserByUsername(username);
        String newAccessToken = generateToken(userDetails);

        logger.info("Access token refreshed successfully for user: {}", username);
        return new JwtResponse(newAccessToken);
    }

    public void logout(String bearerToken) {
        logger.info("Logging out user");
        if (!bearerToken.startsWith("Bearer ")) {
            logger.error("Incorrect Authorization header format.");
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect Authorization header format.");
        }

        String refreshTokenValue = bearerToken.substring(7);
        String username = this.extractUsername(refreshTokenValue);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        logger.info("UserDetails: {}", user);

        refreshTokenService.deleteByUserId(user.getUserId());
        logger.info("User logged out successfully: {}", username);
    }
}