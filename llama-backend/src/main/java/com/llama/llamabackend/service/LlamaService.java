package com.llama.llamabackend.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.stereotype.Service;

@Service
public class LlamaService {

    @JsonProperty("output")
    private String output;

    @JsonProperty("language")
    private String language;

    @JsonProperty("errors")
    private String errors;

    @JsonProperty("corrections")
    private String corrections;

    @JsonProperty("input_tokens")
    private int inputTokens;

    @JsonProperty("output_tokens")
    private int outputTokens;

    @JsonProperty("response_time_ms")
    private double responseTimeMs;

    // Getters et setters

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getErrors() {
        return errors;
    }

    public void setErrors(String errors) {
        this.errors = errors;
    }

    public String getCorrections() {
        return corrections;
    }

    public void setCorrections(String corrections) {
        this.corrections = corrections;
    }

    public int getInputTokens() {
        return inputTokens;
    }

    public void setInputTokens(int inputTokens) {
        this.inputTokens = inputTokens;
    }

    public int getOutputTokens() {
        return outputTokens;
    }

    public void setOutputTokens(int outputTokens) {
        this.outputTokens = outputTokens;
    }

    public double getResponseTimeMs() {
        return responseTimeMs;
    }

    public void setResponseTimeMs(double responseTimeMs) {
        this.responseTimeMs = responseTimeMs;
    }
}



