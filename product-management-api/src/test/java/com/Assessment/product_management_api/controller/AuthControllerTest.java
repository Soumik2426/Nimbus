package com.Assessment.product_management_api.controller;

import com.Assessment.product_management_api.advice.GlobalExceptionHandler;
import com.Assessment.product_management_api.dto.request.LoginRequest;
import com.Assessment.product_management_api.dto.request.RegisterRequest;
import com.Assessment.product_management_api.dto.response.HelperResponse;
import com.Assessment.product_management_api.dto.response.LoginResponse;
import com.Assessment.product_management_api.dto.response.UserResponse;
import com.Assessment.product_management_api.entity.Role;
import com.Assessment.product_management_api.service.AuthService;
import com.Assessment.product_management_api.service.OtpService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private AuthService authService;
    private OtpService otpService;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        authService = mock(AuthService.class);
        otpService = mock(OtpService.class);
        mockMvc = MockMvcBuilders
                .standaloneSetup(new V1AuthController(authService, otpService))
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void registerUserReturnsCreatedUser() throws Exception {
        RegisterRequest request = registerRequest();
        when(authService.registerUser(any(RegisterRequest.class))).thenReturn(userResponse());
        when(otpService.sendOtp("soumik@example.com")).thenReturn("123456");

        mockMvc.perform(post("/api/v1/auth/registerUser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Account created. Check your email for the verification code."))
                .andExpect(jsonPath("$.data.email").value("soumik@example.com"))
                .andExpect(jsonPath("$.data.role").value("USER"));

        verify(otpService).sendOtp("soumik@example.com");
    }

    @Test
    void loginReturnsJwtToken() throws Exception {
        LoginRequest request = loginRequest();
        when(authService.login(any(LoginRequest.class))).thenReturn(loginResponse());

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Logged In Successfully"))
                .andExpect(jsonPath("$.data.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.data.user.email").value("soumik@example.com"));
    }

    @Test
    void registerRejectsBlankFirstName() throws Exception {
        RegisterRequest request = registerRequest();
        request.setFirstName("");

        mockMvc.perform(post("/api/v1/auth/registerUser")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error.message").value("Validation Error"));
    }

    private RegisterRequest registerRequest() {
        return RegisterRequest.builder()
                .firstName("Soumik")
                .lastName("Das")
                .email("soumik@example.com")
                .password("StrongPass@123")
                .build();
    }

    private LoginRequest loginRequest() {
        return LoginRequest.builder()
                .email("soumik@example.com")
                .password("StrongPass@123")
                .build();
    }

    private UserResponse userResponse() {
        return UserResponse.builder()
                .id(1L)
                .firstName("Soumik")
                .lastName("Das")
                .email("soumik@example.com")
                .role(Role.USER)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }

    private LoginResponse loginResponse() {
        HelperResponse helperResponse = HelperResponse.builder()
                .id(1L)
                .firstName("Soumik")
                .lastName("Das")
                .email("soumik@example.com")
                .role(Role.USER)
                .build();

        return LoginResponse.builder()
                .token("test-jwt-token")
                .user(helperResponse)
                .build();
    }
}
