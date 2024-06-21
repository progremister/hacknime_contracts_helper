package com.olos.contracthelperapi.entities;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "templates")
public class Template {
    @Id
    private Long id;
    private String urlS3Bucket;
    private List<String> keys;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlS3Bucket() {
        return urlS3Bucket;
    }

    public void setUrlS3Bucket(String urlS3Bucket) {
        this.urlS3Bucket = urlS3Bucket;
    }

    public List<String> getKeys() {
        return keys;
    }

    public void setKeys(List<String> keys) {
        this.keys = keys;
    }
}

