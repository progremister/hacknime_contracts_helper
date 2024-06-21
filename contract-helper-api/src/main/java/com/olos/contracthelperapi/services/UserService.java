package com.olos.contracthelperapi.services;

import com.olos.contracthelperapi.dto.RegisterRequest;
import com.olos.contracthelperapi.entities.Role;
import com.olos.contracthelperapi.entities.User;
import com.olos.contracthelperapi.exceptions.roleExceptions.RoleNotFoundException;
import com.olos.contracthelperapi.exceptions.usersException.UserNotFoundException;
import com.olos.contracthelperapi.exceptions.usersException.UsernameAlreadyExistsException;
import com.olos.contracthelperapi.repositories.RoleRepository;
import com.olos.contracthelperapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private static final Logger logger = LogManager.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.refreshTokenService = refreshTokenService;

        logger.info("UserService initialized");
    }

    public List<User> getAllUsers() {
        logger.info("Fetching all users");
        return userRepository.findAll();
    }

    public User getUserById(String userId) {
        logger.info("Fetching user with ID: {}", userId);
        return userRepository.findById(userId).orElseThrow(() -> {
            logger.error("User not found with ID: {}", userId);
            return new UserNotFoundException(userId);
        });
    }

    public User updateUser(String userId, RegisterRequest updatedUser) {
        logger.info("Updating user with ID: {}", userId);
        User existingUser = userRepository.findById(userId).orElseThrow(() -> {
            logger.error("User not found with ID: {}", userId);
            return new UserNotFoundException(userId);
        });

        if (!existingUser.getUsername().equals(updatedUser.username()) &&
                userRepository.existsByUsernameAndUserIdNot(updatedUser.username(), userId)) {
            logger.error("Username already exists: {}", updatedUser.username());
            throw new UsernameAlreadyExistsException(updatedUser.username());
        }

        if (!existingUser.getUsername().equals(updatedUser.username())) {
            logger.info("Changing username for user ID: {} from {} to {}", userId, existingUser.getUsername(), updatedUser.username());
            refreshTokenService.deleteByUsername(existingUser.getUsername());
            existingUser.setUsername(updatedUser.username());
        }

        existingUser.setPassword(passwordEncoder.encode(updatedUser.password()));
        existingUser.setEmail(updatedUser.email());

        Role role = roleRepository.findByName(updatedUser.roleName()).orElseThrow(() -> {
            logger.error("Role not found: {}", updatedUser.roleName());
            return new RoleNotFoundException(updatedUser.roleName());
        });

        existingUser.setRole(role);
        User updated = userRepository.save(existingUser);
        logger.info("User updated with ID: {}", userId);
        return updated;
    }

    public void deleteUser(String userId) {
        logger.info("Deleting user with ID: {}", userId);
        if (!userRepository.existsById(userId)) {
            logger.error("User not found with ID: {}", userId);
            throw new UserNotFoundException(userId);
        }

        refreshTokenService.deleteByUsername(getUserById(userId).getUsername());
        userRepository.deleteById(userId);
        logger.info("User deleted with ID: {}", userId);
    }

    public boolean existsByEmail(String email) {
        logger.info("Checking if email exists in the database: {}", email);
        boolean exists = userRepository.existsByEmail(email);
        logger.info("Email {} exists: {}", email, exists);
        return exists;
    }

    public boolean existsById(String userId) {
        logger.info("Checking if user exists with ID: {}", userId);
        boolean exists = userRepository.existsById(userId);
        logger.info("User with ID {} exists: {}", userId, exists);
        return exists;
    }
}
