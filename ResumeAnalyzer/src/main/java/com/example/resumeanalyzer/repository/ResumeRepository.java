package com.example.resumeanalyzer.repository;

import com.example.resumeanalyzer.model.Resume;
import com.example.resumeanalyzer.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findByUser(User user);
}