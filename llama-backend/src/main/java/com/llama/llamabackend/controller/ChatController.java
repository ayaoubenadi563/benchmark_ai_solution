package com.llama.llamabackend.controller;

import com.llama.llamabackend.dto.ChatDTO;
import com.llama.llamabackend.dto.CreateChatRequest;
import com.llama.llamabackend.dto.MessageDTO;
import com.llama.llamabackend.dto.ErrorExplanationDTO;
import com.llama.llamabackend.model.Chat;
import com.llama.llamabackend.model.Message;
import com.llama.llamabackend.repository.ChatRepository;
import com.llama.llamabackend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin("*")
public class ChatController {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatController(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping
    public ResponseEntity<List<ChatDTO>> getAllChats() {
        List<Chat> chats = chatRepository.findAllByOrderByUpdatedAtDesc();
        List<ChatDTO> chatDTOs = chats.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(chatDTOs);
    }

    @PostMapping
    public ResponseEntity<ChatDTO> createChat(@RequestBody CreateChatRequest request) {
        Chat chat = new Chat();
        chat.setTitle(request.getTitle() != null ? request.getTitle() : "Nouveau chat");
        Chat savedChat = chatRepository.save(chat);
        return ResponseEntity.ok(convertToDTO(savedChat));
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatDTO> getChat(@PathVariable Long chatId) {
        return chatRepository.findById(chatId)
                .map(chat -> {
                    ChatDTO dto = convertToDTO(chat);
                    List<Message> messages = messageRepository.findByChatIdOrderByCreatedAtAsc(chatId);
                    List<MessageDTO> messageDTOs = messages.stream()
                            .map(this::convertMessageToDTO)
                            .collect(Collectors.toList());
                    dto.setMessages(messageDTOs);
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(@PathVariable Long chatId) {
        if (chatRepository.existsById(chatId)) {
            chatRepository.deleteById(chatId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private ChatDTO convertToDTO(Chat chat) {
        return new ChatDTO(
                chat.getId(),
                chat.getTitle(),
                chat.getCreatedAt(),
                chat.getUpdatedAt()
        );
    }

    private MessageDTO convertMessageToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setPrompt(message.getPrompt());
        dto.setOutput(message.getOutput());
        dto.setOriginalCode(message.getOriginalCode());
        dto.setCorrectedCode(message.getCorrectedCode());
        dto.setOriginalHighlightLines(message.getOriginalHighlightLines());
        dto.setCorrectedHighlightLines(message.getCorrectedHighlightLines());
        dto.setLanguage(message.getLanguage());
        dto.setErrors(message.getErrors());
        dto.setCorrections(message.getCorrections());
        dto.setInputTokens(message.getInputTokens());
        dto.setOutputTokens(message.getOutputTokens());
        dto.setResponseTimeMs(message.getResponseTimeMs());
        dto.setCreatedAt(message.getCreatedAt());
        
        if (message.getExplanations() != null) {
            List<ErrorExplanationDTO> expDTOs = message.getExplanations().stream()
                .map(e -> new ErrorExplanationDTO(e.getId(), e.getLine(), e.getTitle(), e.getProblem(), e.getSolution()))
                .collect(Collectors.toList());
            dto.setExplanations(expDTOs);
        }
        
        return dto;
    }
} 