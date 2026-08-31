package com.Assessment.product_management_api.service.impl;

import com.Assessment.product_management_api.service.EmailService;
import com.Assessment.product_management_api.service.OtpService;
import com.Assessment.product_management_api.service.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpServiceImpl implements OtpService {

    private final RedisService redisService;
    private final EmailService emailService;

    @Value("${app.otp.ttl-minutes:5}")
    private Long otpTtlMinutes;

    private static final SecureRandom RANDOM = new SecureRandom();

    @Override
    public String sendOtp(String email) {
        String otp = generateOtp();
        String key = otpKey(email);
        redisService.save(key, otp, Duration.ofMinutes(otpTtlMinutes));
        emailService.sendOtpEmail(email, otp);
        log.info("OTP generated and stored for email {}", email);
        return otp;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        String key = otpKey(email);
        String storedOtp = redisService.get(key);

        if (storedOtp == null) {
            throw new IllegalArgumentException("OTP expired or not found.");
        }

        if (!storedOtp.equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP.");
        }

        redisService.delete(key);
        log.info("OTP verified successfully for email {}", email);
        return true;
    }

    private String generateOtp() {
        int otp = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(otp);
    }

    private String otpKey(String email) {
        return "otp:" + email.trim().toLowerCase();
    }
}
