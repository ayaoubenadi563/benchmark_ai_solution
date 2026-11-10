package com.llama.llamabackend.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LlamaResponseDTO {
    private String output;
    private String language;
    private List<String> errors;
    private List<String> corrections;
    private int inputTokens;
    private int outputTokens;
    private double responseTimeMs;
    private String originalCode;
    private String correctedCode;
    private List<Integer> originalHighlightLines;
    private List<Integer> correctedHighlightLines;
    private List<ErrorExplanationDTO> explanations;
    private Long chatId;
}
