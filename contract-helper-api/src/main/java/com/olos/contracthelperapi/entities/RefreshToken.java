package com.olos.contracthelperapi.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "refresh_tokens")
public class RefreshToken {

    @Id
    private String id;

    private String token;
    private Instant expiryDate;

    private String userId;

    @DBRef
    private User user;
}