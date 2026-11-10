package com.llama.llamabackend.repository;

import com.llama.llamabackend.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findAllByOrderByUpdatedAtDesc();
} 