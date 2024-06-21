package com.olos.contracthelperapi.services;

import com.olos.contracthelperapi.entities.Template;
import com.olos.contracthelperapi.repositories.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    @Autowired
    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    public Optional<Template> getTemplateById(Long id) {
        return templateRepository.findById(id);
    }

    public Template createTemplate(Template template) {
        return templateRepository.save(template);
    }

    public Template updateTemplate(Long id, Template template) {
        Optional<Template> existingTemplate = templateRepository.findById(id);
        if (existingTemplate.isPresent()) {
            template.setId(id);
            return templateRepository.save(template);
        } else {
            return null; // Or throw an exception
        }
    }

    public void deleteTemplate(Long id) {
        templateRepository.deleteById(id);
    }
}
