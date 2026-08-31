package com.Assessment.product_management_api.service;

import com.Assessment.product_management_api.dto.request.LoginRequest;
import com.Assessment.product_management_api.dto.request.RegisterRequest;
import com.Assessment.product_management_api.dto.response.LoginResponse;
import com.Assessment.product_management_api.dto.response.UserResponse;
import com.Assessment.product_management_api.entity.Role;
import com.Assessment.product_management_api.entity.UserEntity;
import com.Assessment.product_management_api.exceptions.DuplicateResourceFound;
import com.Assessment.product_management_api.exceptions.ResourceNotFoundException;
import com.Assessment.product_management_api.repository.UserRepository;
import com.Assessment.product_management_api.security.JwtService;
import com.Assessment.product_management_api.service.impl.AuthServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthServiceTest {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;
    private JwtService jwtService;
    private AuthService authService;

    @BeforeEach
    void setUp() {
        userRepository = mock(UserRepository.class);
        passwordEncoder = mock(PasswordEncoder.class);
        modelMapper = new ModelMapper();
        jwtService = mock(JwtService.class);
        authService = new AuthServiceImpl(userRepository, passwordEncoder, modelMapper, jwtService);
    }

    @Test
    void registerUserCreatesUser() {
        RegisterRequest request = registerRequest();
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encoded-password");
        when(userRepository.save(any(UserEntity.class))).thenAnswer(invocation -> {
            UserEntity entity = invocation.getArgument(0);
            entity.setId(1L);
            return entity;
        });

        UserResponse response = authService.registerUser(request);

        assertEquals(1L, response.getId());
        assertEquals(Role.USER, response.getRole());
        assertEquals("soumik@example.com", response.getEmail());
    }

    @Test
    void registerUserRejectsDuplicateEmail() {
        RegisterRequest request = registerRequest();
        when(userRepository.existsByEmail(request.getEmail())).thenReturn(true);

        assertThrows(DuplicateResourceFound.class, () -> authService.registerUser(request));
    }

    @Test
    void loginReturnsTokenAndUser() {
        UserEntity userEntity = userEntity();
        userEntity.setEmailVerified(true);
        when(userRepository.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));
        when(passwordEncoder.matches("StrongPass@123", "encoded-password")).thenReturn(true);
        when(jwtService.generateJwtToken(userEntity)).thenReturn("jwt-token");

        LoginResponse response = authService.login(loginRequest());

        assertEquals("jwt-token", response.getToken());
        assertEquals("soumik@example.com", response.getUser().getEmail());
    }

    @Test
    void loginRejectsInvalidPassword() {
        UserEntity userEntity = userEntity();
        when(userRepository.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));
        when(passwordEncoder.matches("StrongPass@123", "encoded-password")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> authService.login(loginRequest()));
    }

    @Test
    void loginRejectsUnverifiedEmail() {
        UserEntity userEntity = userEntity();
        when(userRepository.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));
        when(passwordEncoder.matches("StrongPass@123", "encoded-password")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> authService.login(loginRequest()));
    }

    @Test
    void verifyEmailMarksUserAsVerified() {
        UserEntity userEntity = userEntity();
        when(userRepository.findByEmail(userEntity.getEmail())).thenReturn(Optional.of(userEntity));

        authService.verifyEmail(userEntity.getEmail());

        assertEquals(true, userEntity.isEmailVerified());
        verify(userRepository).save(userEntity);
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

    private UserEntity userEntity() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setFirstName("Soumik");
        userEntity.setLastName("Das");
        userEntity.setEmail("soumik@example.com");
        userEntity.setPassword("encoded-password");
        userEntity.setRole(Role.USER);
        return userEntity;
    }
}
