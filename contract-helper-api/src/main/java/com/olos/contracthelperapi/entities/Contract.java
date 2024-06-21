package com.olos.contracthelperapi.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "documents")
public class Contract {
    @Id
    private Long id;

    @DBRef
    private List<User> members;

    @DBRef
    private User creator;

    @DBRef
    private Template template;

    private Map<String, String> values;

    // Getters and setters
}

