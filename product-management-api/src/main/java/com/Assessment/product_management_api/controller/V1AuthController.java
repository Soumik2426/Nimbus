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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Authentication", description = "User registration and login endpoints")
public class V1AuthController {

    private final AuthService authService;
    private final OtpService otpService;

    public V1AuthController(AuthService authService) {
        this(authService, null);
    }

    @Autowired
    public V1AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/registerUser")
    @Operation(summary = "Register a new user", description = "Creates a new USER account and emails a verification OTP.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Registered successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "409", description = "Email already exists")
    })
    public ResponseEntity<ApiResponse<UserResponse>> registerUser(@RequestBody @Valid RegisterRequest registerRequest){
        UserResponse userResponse = authService.registerUser(registerRequest);
        otpService.sendOtp(userResponse.getEmail());
        return new ResponseEntity<>(new ApiResponse<>(userResponse, "Account created. Check your email for the verification code."), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    @Operation(summary = "Login a user", description = "Authenticates a user and returns a Bearer JWT token.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Logged in successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "404", description = "Invalid email or password")
    })
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody @Valid LoginRequest loginRequest){
        LoginResponse loginResponse = authService.login(loginRequest);
        return new ResponseEntity<>(new ApiResponse<>(loginResponse, "Logged In Successfully"), HttpStatus.OK);
    }

    @PostMapping("/send-otp")
    @Operation(summary = "Send OTP to email", description = "Sends a temporary one-time password to the user's email address using Redis and SMTP.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OTP sent successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Validation error")
    })
    public ResponseEntity<ApiResponse<String>> sendOtp(@RequestBody @Valid OtpRequest otpRequest) {
        if (otpService == null) {
            throw new IllegalStateException("OTP service is not configured.");
        }
        otpService.sendOtp(otpRequest.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("OTP sent successfully to your email.", "OTP sent successfully to your email."));
    }

    @PostMapping("/verify-otp")
    @Operation(summary = "Verify email OTP", description = "Verifies a previously sent OTP from Redis.")
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OTP verified successfully"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Invalid or expired OTP")
    })
    public ResponseEntity<ApiResponse<String>> verifyOtp(@RequestBody @Valid OtpVerificationRequest otpVerificationRequest) {
        if (otpService == null) {
            throw new IllegalStateException("OTP service is not configured.");
        }
        otpService.verifyOtp(otpVerificationRequest.getEmail(), otpVerificationRequest.getOtp());
        authService.verifyEmail(otpVerificationRequest.getEmail());
        return ResponseEntity.ok(new ApiResponse<>("Email verified successfully.", "Email verified successfully."));
    }
}
