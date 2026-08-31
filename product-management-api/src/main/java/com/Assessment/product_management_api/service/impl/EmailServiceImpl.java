package com.Assessment.product_management_api.service.impl;

import com.Assessment.product_management_api.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:phishingguardian.noreply@gmail.com}")
    private String fromEmail;

    @Override
    public void sendOtpEmail(String email, String otp) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setSubject("Your OTP for Account Verification");
            helper.setText(buildOtpEmailBody(otp), true);
            mailSender.send(mimeMessage);
            log.info("OTP email sent to {}", email);
        } catch (MessagingException e) {
            log.error("Failed to send OTP email to {}", email, e);
            throw new IllegalStateException("Could not send OTP email.", e);
        }
    }

    private String buildOtpEmailBody(String otp) {
        return "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;'>"
                + "<h2 style='color: #111827; margin-bottom: 16px;'>Your verification code</h2>"
                + "<p style='color: #374151; font-size: 16px; line-height: 1.6;'>Use the following One-Time Password (OTP) to verify your account:</p>"
                + "<div style='margin: 24px 0; padding: 20px; background: #eef2ff; border-radius: 10px; text-align: center;'>"
                + "<span style='font-size: 32px; letter-spacing: 6px; font-weight: 700; color: #312e81;'>" + otp + "</span>"
                + "</div>"
                + "<p style='color: #4b5563; font-size: 14px;'>This code is valid for 5 minutes. Do not share it with anyone.</p>"
                + "<p style='color: #4b5563; font-size: 14px;'>Regards,<br/>Phishing Guardian Team</p>"
                + "</div>";
    }
}
