package com.olos.contracthelperapi.repositories;

import com.olos.contracthelperapi.entities.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(String roleName);
    boolean existsByName(String name);
}
