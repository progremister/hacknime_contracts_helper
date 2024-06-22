package com.olos.contracthelperapi.repositories;

import com.olos.contracthelperapi.entities.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepository extends MongoRepository<Template, Long> {
}
