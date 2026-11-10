package com.llama.llamabackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Entity
public class PromptHistory {

    // Getters & Setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String prompt;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String output;

    @Setter
    private int inputTokens;
    @Setter
    private int outputTokens;
    @Setter
    private double responseTimeMs;

    @Setter
    private LocalDateTime timestamp = LocalDateTime.now();
    @Setter
    @Column(columnDefinition = "TEXT")
    private String originalWithHighlights;

    @Setter
    @Column(columnDefinition = "TEXT")
    private String correctedWithHighlights;

}
