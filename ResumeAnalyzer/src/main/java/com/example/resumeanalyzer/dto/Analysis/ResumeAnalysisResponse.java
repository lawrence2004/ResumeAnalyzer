package com.example.resumeanalyzer.dto.Analysis;

import com.example.resumeanalyzer.model.ResumeAnalysis;
import com.example.resumeanalyzer.util.JsonUtil;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ResumeAnalysisResponse {

    private Long id;

    private String companyName;
    private String jobTitle;

    private int matchPercentage;
    private int atsScore;

    private List<String> missingSkills;
    private List<String> suggestedKeywords;
    private List<String> improvementTips;

    private LocalDateTime analyzedAt;

    public static ResumeAnalysisResponse from(ResumeAnalysis analysis) {
        return ResumeAnalysisResponse.builder()
                .id(analysis.getId())
                .companyName(analysis.getJobDescription().getCompanyName())
                .jobTitle(analysis.getJobDescription().getTitle())
                .matchPercentage(analysis.getMatchPercentage())
                .atsScore(analysis.getAtsScore())
                .missingSkills(JsonUtil.toList(analysis.getMissingSkills()))
                .suggestedKeywords(JsonUtil.toList(analysis.getSuggestedKeywords()))
                .improvementTips(JsonUtil.toList(analysis.getImprovementTips()))
                .analyzedAt(analysis.getAnalyzedAt())
                .build();
    }
}