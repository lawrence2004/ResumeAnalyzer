package com.example.resumeanalyzer.repository;

import com.example.resumeanalyzer.model.Resume;
import com.example.resumeanalyzer.model.ResumeAnalysis;
import com.example.resumeanalyzer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {

    @Query("""
        SELECT ra 
        FROM ResumeAnalysis ra
        WHERE ra.resume.user = :user
        ORDER BY ra.analyzedAt DESC
    """)
    List<ResumeAnalysis> findAllByUser(User user);
}