package com.llama.llamabackend.dto;

public class PromptRequest {
    private String prompt;
    private String code;
    private Long chatId;

    public PromptRequest() {}

    public PromptRequest(String prompt, String code, Long chatId) {
        this.prompt = prompt;
        this.code = code;
        this.chatId = chatId;
    }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public Long getChatId() { return chatId; }
    public void setChatId(Long chatId) { this.chatId = chatId; }
}

