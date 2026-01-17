package com.example.resumeanalyzer.service;

import com.example.resumeanalyzer.dto.Analysis.ResumeAnalysisResponse;
import com.example.resumeanalyzer.model.*;
import com.example.resumeanalyzer.repository.JobDescriptionRepository;
import com.example.resumeanalyzer.repository.ResumeAnalysisRepository;
import com.example.resumeanalyzer.repository.ResumeRepository;
import com.example.resumeanalyzer.util.JsonUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResumeAnalysisService {

    private final ResumeRepository resumeRepository;
    private final JobDescriptionRepository jobDescriptionRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final ResumeTextExtractor resumeTextExtractor;

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    public ResumeAnalysisResponse uploadAndAnalyze(
            MultipartFile file,
            String companyName,
            String jobTitle,
            String jobDescriptionText,
            User user
    ) {

        String resumeText = resumeTextExtractor.extract(file);
     
        Resume resume = Resume.builder()
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .extractedText(resumeText)
                .uploadedAt(LocalDateTime.now())
                .user(user)
                .build();
        resumeRepository.save(resume);

        JobDescription jobDescription = JobDescription.builder()
                .companyName(companyName)
                .title(jobTitle)
                .descriptionText(jobDescriptionText)
                .createdAt(LocalDateTime.now())
                .build();
        jobDescriptionRepository.save(jobDescription);

        String aiResponseJson = callGeminiAI(resumeText, jobDescriptionText);

        Map<String, Object> aiResult = JsonUtil.parse(aiResponseJson);

        ResumeAnalysis analysis = ResumeAnalysis.builder()
                .resume(resume)
                .jobDescription(jobDescription)
                .matchPercentage((Integer) aiResult.get("matchPercentage"))
                .atsScore((Integer) aiResult.get("atsScore"))
                .missingSkills(JsonUtil.toJson(aiResult.get("missingSkills")))
                .suggestedKeywords(JsonUtil.toJson(aiResult.get("suggestedKeywords")))
                .improvementTips(JsonUtil.toJson(aiResult.get("improvementTips")))
                .analyzedAt(LocalDateTime.now())
                .build();

        resumeAnalysisRepository.save(analysis);
     
        return ResumeAnalysisResponse.from(analysis);
    }

    private String callGeminiAI(String resumeText, String jobDescription) {

        String prompt = """
            You are an ATS resume analyzer.
            
            You MUST respond with ONLY valid JSON.
            DO NOT include explanations.
            DO NOT include markdown.
            DO NOT include backticks.
            DO NOT include comments.
            DO NOT include text outside JSON.
            
            The response MUST start with '{' and end with '}'.
            
            JSON SCHEMA (STRICT):
            {
              "matchPercentage": number,
              "atsScore": number,
              "missingSkills": [string],
              "suggestedKeywords": [string],
              "improvementTips": [string]
            }
            
            RESUME:
            """ + resumeText + """
            
            JOB DESCRIPTION:
            """ + jobDescription;


        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)
                        ))
                )
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                geminiApiUrl + "?key=" + geminiApiKey,
                HttpMethod.POST,
                entity,
                Map.class
        );

      
        Map<String, Object> candidate =
                (Map<String, Object>) ((List<?>) response.getBody()
                        .get("candidates")).get(0);

        Map<String, Object> content =
                (Map<String, Object>) candidate.get("content");

        Map<String, Object> part =
                (Map<String, Object>) ((List<?>) content.get("parts")).get(0);

        return part.get("text").toString();
    }

    public List<ResumeAnalysisResponse> getAllAnalysis(User user) {

        List<ResumeAnalysis> analyses =
                resumeAnalysisRepository.findAllByUser(user);

        return analyses.stream()
                .map(ResumeAnalysisResponse::from)
                .toList();
    }
}
