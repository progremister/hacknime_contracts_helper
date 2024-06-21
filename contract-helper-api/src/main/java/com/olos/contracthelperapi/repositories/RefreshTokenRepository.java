package com.olos.contracthelperapi.repositories;

import com.olos.contracthelperapi.entities.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUser_Username(String username);
    Optional<RefreshToken> findByUserId(String userId);
}
