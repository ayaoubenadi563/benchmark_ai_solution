package com.llama.llamabackend.model;

public class PromptResponse {
    private String output;
    private String language;
    private String errors;
    private String corrections;

    private int inputTokens;
    private int outputTokens;
    private double responseTimeMs;

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
