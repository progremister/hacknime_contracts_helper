package com.olos.contracthelperapi.services;

import com.olos.contracthelperapi.entities.RefreshToken;
import com.olos.contracthelperapi.entities.User;
import com.olos.contracthelperapi.exceptions.usersException.UserNotFoundException;
import com.olos.contracthelperapi.repositories.RefreshTokenRepository;
import com.olos.contracthelperapi.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private RefreshTokenRepository refreshTokenRepository;
    private UserRepository userRepository;

    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public Optional<RefreshToken> findByUserId(String userId) {
        return refreshTokenRepository.findByUserId(userId);
    }

    public RefreshToken createRefreshToken(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId));

        RefreshToken refreshToken = RefreshToken.builder()
                .userId(user.getUserId())
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(1000 * 604800))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public void verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RuntimeException(token.getToken() + " Refresh token was expired. Please make a new signing request");
        }
    }

    public RefreshToken updateRefreshToken(RefreshToken refreshToken) {
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiryDate(Instant.now().plusMillis(1000 * 604800));
        return refreshTokenRepository.save(refreshToken);
    }

    public void deleteByUserId(String userId) {
        refreshTokenRepository.findByUserId(userId).ifPresent(refreshToken -> {
            refreshTokenRepository.delete(refreshToken);
        });
    }

}
