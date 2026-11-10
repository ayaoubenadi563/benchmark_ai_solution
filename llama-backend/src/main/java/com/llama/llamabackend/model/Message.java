package com.llama.llamabackend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    @Column(columnDefinition = "TEXT")
    private String output;

    @Column(name = "original_code", columnDefinition = "TEXT")
    private String originalCode;

    @Column(name = "corrected_code", columnDefinition = "TEXT")
    private String correctedCode;

    @ElementCollection
    @CollectionTable(name = "message_original_highlights", joinColumns = @JoinColumn(name = "message_id"))
    @Column(name = "line_number")
    private List<Integer> originalHighlightLines;

    @ElementCollection
    @CollectionTable(name = "message_corrected_highlights", joinColumns = @JoinColumn(name = "message_id"))
    @Column(name = "line_number")
    private List<Integer> correctedHighlightLines;

    @Column(name = "language")
    private String language;

    @ElementCollection
    @CollectionTable(name = "message_errors", joinColumns = @JoinColumn(name = "message_id"))
    @Column(name = "error_message", columnDefinition = "TEXT")
    private List<String> errors;

    @ElementCollection
    @CollectionTable(name = "message_corrections", joinColumns = @JoinColumn(name = "message_id"))
    @Column(name = "correction_message", columnDefinition = "TEXT")
    private List<String> corrections;

    @Column(name = "input_tokens")
    private Integer inputTokens;

    @Column(name = "output_tokens")
    private Integer outputTokens;

    @Column(name = "response_time_ms")
    private Long responseTimeMs;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "message_id")
    private List<ErrorExplanation> explanations = new java.util.ArrayList<>();

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Chat getChat() { return chat; }
    public void setChat(Chat chat) { this.chat = chat; }

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

    public List<ErrorExplanation> getExplanations() { return explanations; }
    public void setExplanations(List<ErrorExplanation> explanations) { this.explanations = explanations; }
} 