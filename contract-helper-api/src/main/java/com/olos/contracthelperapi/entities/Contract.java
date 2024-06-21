package com.olos.contracthelperapi.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;
import io.swagger.v3.oas.annotations.media.Schema;

@Document(collection = "contracts")
public class Contract {
    @Id
    @Schema(description = "Unique identifier of the contract", example = "12345")
    private Long id;

    @DBRef
    @Schema(description = "List of users involved in the contract")
    private List<User> members;

    @DBRef
    @Schema(description = "User who created the contract")
    private User creator;

    @DBRef
    @Schema(description = "Template used for the contract")
    private Template template;

    @Schema(description = "Values associated with the contract", example = "{\"startDate\": \"2023-01-01\", \"endDate\": \"2023-12-31\", \"totalAmount\": \"10000\"}")
    private Map<String, String> values;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<User> getMembers() {
        return members;
    }

    public void setMembers(List<User> members) {
        this.members = members;
    }

    public User getCreator() {
        return creator;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    public Template getTemplate() {
        return template;
    }

    public void setTemplate(Template template) {
        this.template = template;
    }

    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values;
    }
}
