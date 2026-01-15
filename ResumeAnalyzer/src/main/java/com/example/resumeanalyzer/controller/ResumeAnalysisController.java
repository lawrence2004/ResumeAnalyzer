package com.example.resumeanalyzer.controller;

import com.example.resumeanalyzer.dto.Analysis.ResumeAnalysisResponse;
import com.example.resumeanalyzer.model.User;
import com.example.resumeanalyzer.service.ResumeAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/analysis")
@RequiredArgsConstructor
public class ResumeAnalysisController {

    private final ResumeAnalysisService resumeAnalysisService;

    @PostMapping("/upload")
    public ResumeAnalysisResponse uploadAndAnalyze(
            @RequestParam("file") MultipartFile file,
            @RequestParam("companyName") String companyName,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("jobDescription") String jobDescription,
            @AuthenticationPrincipal User user
    ) {
        return resumeAnalysisService.uploadAndAnalyze(
                file, companyName, jobTitle, jobDescription, user
        );
    }

    @GetMapping("/getAllAnalysis")
    public List<ResumeAnalysisResponse> getAllAnalysis(@AuthenticationPrincipal User user) {
        return resumeAnalysisService.getAllAnalysis(user);
    }
}