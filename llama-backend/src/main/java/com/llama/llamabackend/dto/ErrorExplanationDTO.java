package com.llama.llamabackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorExplanationDTO {
    private Long id;
    private int line;
    private String title;
    private String problem;
    private String solution;

    public ErrorExplanationDTO() {}

    public ErrorExplanationDTO(Long id, int line, String title, String problem, String solution) {
        this.id = id;
        this.line = line;
        this.title = title;
        this.problem = problem;
        this.solution = solution;
    }
}
