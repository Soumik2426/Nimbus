package com.Assessment.product_management_api.controller;

import com.Assessment.product_management_api.advice.ApiResponse;
import com.Assessment.product_management_api.dto.request.LoginRequest;
import com.Assessment.product_management_api.dto.request.OtpRequest;
import com.Assessment.product_management_api.dto.request.OtpVerificationRequest;
import com.Assessment.product_management_api.dto.request.RegisterRequest;
import com.Assessment.product_management_api.dto.response.LoginResponse;
import com.Assessment.product_management_api.dto.response.UserResponse;
import com.Assessment.product_management_api.service.AuthService;
import com.Assessment.product_management_api.service.OtpService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@Hidden
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService) {
        this(authService, null);
    }

    @Autowired
    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    //To create a new user
    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(@RequestBody @Valid RegisterRequest registerRequest){
        UserResponse userResponse = authService.registerUser(registerRequest);
        return new ResponseEntity<>(new ApiResponse<>(userResponse, "Registered Successfully"), HttpStatus.CREATED);
    }

    //To login
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest loginRequest){
        LoginResponse loginResponse = authService.login(loginRequest);
        return new ResponseEntity<>(new ApiResponse<>(loginResponse, "Logged In Successfully"), HttpStatus.OK);
    }

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse<String>> sendOtp(@RequestBody @Valid OtpRequest otpRequest) {
        if (otpService == null) {
            throw new IllegalStateException("OTP service is not configured.");
        }
        otpService.sendOtp(otpRequest.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("OTP sent successfully to your email.", "OTP sent successfully to your email."));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestBody @Valid OtpVerificationRequest otpVerificationRequest) {
        if (otpService == null) {
            throw new IllegalStateException("OTP service is not configured.");
        }
        otpService.verifyOtp(otpVerificationRequest.getEmail(), otpVerificationRequest.getOtp());
        return ResponseEntity.ok(new ApiResponse<>("OTP verified successfully.", "OTP verified successfully."));
    }
}
