package com.llama.llamabackend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ErrorExplanation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int line;
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String problem;
    
    @Column(columnDefinition = "TEXT")
    private String solution;

    public ErrorExplanation() {}

    public ErrorExplanation(int line, String title, String problem, String solution) {
        this.line = line;
        this.title = title;
        this.problem = problem;
        this.solution = solution;
    }
}
