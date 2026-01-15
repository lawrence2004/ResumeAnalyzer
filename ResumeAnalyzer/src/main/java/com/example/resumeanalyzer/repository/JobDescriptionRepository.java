package com.example.resumeanalyzer.repository;

import com.example.resumeanalyzer.model.JobDescription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobDescriptionRepository extends JpaRepository<JobDescription, Long> {
}
