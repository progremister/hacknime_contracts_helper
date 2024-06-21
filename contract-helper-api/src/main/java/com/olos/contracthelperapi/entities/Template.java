package com.olos.contracthelperapi.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

@Document(collection = "templates")
public class Template {
    @Id
    @Schema(description = "Unique identifier of the template", example = "1")
    private Long id;

    @Schema(description = "URL of the S3 bucket where the template is stored", example = "https://s3.amazonaws.com/bucket/template.docx")
    private String urlS3Bucket;

    @Schema(description = "Keys associated with the template", example = "[\"name\", \"date\", \"amount\"]")
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
