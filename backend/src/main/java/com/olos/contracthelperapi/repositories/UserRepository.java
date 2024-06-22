package com.olos.contracthelperapi.repositories;

import com.olos.contracthelperapi.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
}

