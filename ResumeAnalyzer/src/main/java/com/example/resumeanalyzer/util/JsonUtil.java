package com.example.resumeanalyzer.util;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.*;

public class JsonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // Convert Object → JSON string
    public static String toJson(Object obj) {
        try {
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert object to JSON", e);
        }
    }

    // Convert JSON string → List<String>
    public static List<String> toList(String json) {
        try {
            if (json == null || json.isEmpty()) {
                return Collections.emptyList();
            }
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert JSON to List", e);
        }
    }

    // Convert AI response → Map<String, Object>
    public static Map<String, Object> parse(String aiResponse) {
        try {
            String json = extractJson(aiResponse);
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse JSON", e);
        }
    }

    // 🔥 Extract valid JSON from LLM output
    private static String extractJson(String text) {
        if (text == null || text.isEmpty()) {
            throw new RuntimeException("Empty AI response");
        }

        int start = text.indexOf('{');
        int end = text.lastIndexOf('}');

        if (start == -1 || end == -1 || end <= start) {
            throw new RuntimeException("No valid JSON found in AI response");
        }

        return text.substring(start, end + 1);
    }
}