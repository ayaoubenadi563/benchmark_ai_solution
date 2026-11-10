package com.llama.llamabackend.dto;

import java.time.LocalDateTime;
import java.util.List;

public class MessageDTO {
    private Long id;
    private String prompt;
    private String output;
    private String originalCode;
    private String correctedCode;
    private List<Integer> originalHighlightLines;
    private List<Integer> correctedHighlightLines;
    private String language;
    private List<String> errors;
    private List<String> corrections;
    private Integer inputTokens;
    private Integer outputTokens;
    private Long responseTimeMs;
    private LocalDateTime createdAt;
    private List<ErrorExplanationDTO> explanations;

    public MessageDTO() {}

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }

    public String getOriginalCode() { return originalCode; }
    public void setOriginalCode(String originalCode) { this.originalCode = originalCode; }

    public String getCorrectedCode() { return correctedCode; }
    public void setCorrectedCode(String correctedCode) { this.correctedCode = correctedCode; }

    public List<Integer> getOriginalHighlightLines() { return originalHighlightLines; }
    public void setOriginalHighlightLines(List<Integer> originalHighlightLines) { this.originalHighlightLines = originalHighlightLines; }

    public List<Integer> getCorrectedHighlightLines() { return correctedHighlightLines; }
    public void setCorrectedHighlightLines(List<Integer> correctedHighlightLines) { this.correctedHighlightLines = correctedHighlightLines; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public List<String> getErrors() { return errors; }
    public void setErrors(List<String> errors) { this.errors = errors; }

    public List<String> getCorrections() { return corrections; }
    public void setCorrections(List<String> corrections) { this.corrections = corrections; }

    public Integer getInputTokens() { return inputTokens; }
    public void setInputTokens(Integer inputTokens) { this.inputTokens = inputTokens; }

    public Integer getOutputTokens() { return outputTokens; }
    public void setOutputTokens(Integer outputTokens) { this.outputTokens = outputTokens; }

    public Long getResponseTimeMs() { return responseTimeMs; }
    public void setResponseTimeMs(Long responseTimeMs) { this.responseTimeMs = responseTimeMs; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<ErrorExplanationDTO> getExplanations() { return explanations; }
    public void setExplanations(List<ErrorExplanationDTO> explanations) { this.explanations = explanations; }
} 