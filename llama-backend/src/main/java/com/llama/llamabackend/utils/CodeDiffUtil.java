package com.llama.llamabackend.utils;

import com.github.difflib.patch.AbstractDelta;
import com.github.difflib.patch.Chunk;
import com.github.difflib.patch.Patch;

import java.util.*;

public class CodeDiffUtil {

    // Retourne les numéros de lignes (1-based) à surligner
    public static List<Integer> getHighlightLines(Patch<String> patch, boolean isOriginal) {
        Set<Integer> lines = new HashSet<>();
        for (AbstractDelta<String> delta : patch.getDeltas()) {
            Chunk<String> chunk = isOriginal ? delta.getSource() : delta.getTarget();
            // ligne 1-based donc +1
            for (int i = chunk.getPosition() + 1; i <= chunk.getPosition() + chunk.size(); i++) {
                lines.add(i);
            }
        }
        List<Integer> sortedLines = new ArrayList<>(lines);
        Collections.sort(sortedLines);
        return sortedLines;
    }
}
