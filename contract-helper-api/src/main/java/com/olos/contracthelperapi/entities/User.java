package com.olos.contracthelperapi.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    @Schema(description = "Unique identifier of the user", example = "1")
    private Long id;

    @Schema(description = "Username of the user", example = "john_doe")
    private String username;

    @Schema(description = "Password of the user", example = "password123")
    private String password;

    @Schema(description = "Email of the user", example = "john_doe@example.com")
    private String email;

    @Schema(description = "Role of the user", example = "ADMIN")
    private Role role;

    @DBRef
    @Schema(description = "List of documents associated with the user")
    private List<Document> documents;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(List<Document> documents) {
        this.documents = documents;
    }
}
