package com.Assessment.product_management_api.service;

public interface OtpService {
    String sendOtp(String email);
    boolean verifyOtp(String email, String otp);
}
