package com.olos.contracthelperapi.repositories;

import com.olos.contracthelperapi.entities.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContractRepository extends MongoRepository<Contract, Long> {
}
