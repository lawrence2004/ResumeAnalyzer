package com.example.resumeanalyzer.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

@Service
public class ResumeTextExtractor {

    public String extract(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resume file is empty");
        }

        String contentType = file.getContentType();

        try (InputStream inputStream = file.getInputStream()) {

            if (contentType != null && contentType.contains("pdf")) {
                return extractFromPdf(inputStream);
            }

            if (contentType != null &&
                    (contentType.contains("word") || contentType.contains("officedocument"))) {
                return extractFromDocx(inputStream);
            }

            throw new RuntimeException("Unsupported file type. Upload PDF or DOCX only.");

        } catch (Exception e) {
            throw new RuntimeException("Failed to extract resume text", e);
        }
    }

    private String extractFromPdf(InputStream inputStream) throws Exception {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String extractFromDocx(InputStream inputStream) throws Exception {
        try (XWPFDocument document = new XWPFDocument(inputStream)) {
            StringBuilder text = new StringBuilder();
            document.getParagraphs().forEach(p ->
                    text.append(p.getText()).append("\n")
            );
            return text.toString();
        }
    }
}