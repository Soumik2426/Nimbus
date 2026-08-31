package com.Assessment.product_management_api.service.impl;

import com.Assessment.product_management_api.dto.request.LoginRequest;
import com.Assessment.product_management_api.dto.request.RegisterRequest;
import com.Assessment.product_management_api.dto.response.HelperResponse;
import com.Assessment.product_management_api.dto.response.LoginResponse;
import com.Assessment.product_management_api.dto.response.UserResponse;
import com.Assessment.product_management_api.entity.Role;
import com.Assessment.product_management_api.entity.UserEntity;
import com.Assessment.product_management_api.exceptions.DuplicateResourceFound;
import com.Assessment.product_management_api.exceptions.ResourceNotFoundException;
import com.Assessment.product_management_api.repository.UserRepository;
import com.Assessment.product_management_api.security.JwtService;
import com.Assessment.product_management_api.service.AuthService;
import org.modelmapper.ModelMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, ModelMapper modelMapper, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
    }

    @Override
    public UserResponse registerUser(RegisterRequest registerRequest){
        log.info("Registering user with email {}", registerRequest.getEmail());
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            log.warn("Registration blocked because email already exists: {}", registerRequest.getEmail());
            throw new DuplicateResourceFound("Email already exists");
        }
        String encodedPassword = passwordEncoder.encode(registerRequest.getPassword());
        UserEntity userEntity = UserEntity.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .password(encodedPassword)
                .role(Role.USER)
                .build();
        UserEntity savedUser=userRepository.save(userEntity);
            log.info("User registered successfully with id {}", savedUser.getId());
        return UserResponse.builder()
                .id(savedUser.getId())
                .firstName(savedUser.getFirstName())
                .lastName(savedUser.getLastName())
                .email(savedUser.getEmail())
                .emailVerified(savedUser.isEmailVerified())
                .role(savedUser.getRole())
                .createdAt(savedUser.getCreatedAt())
                .updatedAt(savedUser.getUpdatedAt())
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest loginRequest){
        log.info("Login attempt received for email {}", loginRequest.getEmail());
        UserEntity user=userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()->new ResourceNotFoundException("Invalid email or password"));

        if(!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword()
        )){
            log.warn("Login failed for email {}", loginRequest.getEmail());
            throw new ResourceNotFoundException("Invalid email or password");
        }

        if (!user.isEmailVerified()) {
            throw new IllegalArgumentException("Please verify your email address before signing in.");
        }

        //To generate JWT token
        String token=jwtService.generateJwtToken(user);
        HelperResponse helperResponse=modelMapper.map(user, HelperResponse.class);
        log.info("Login successful for user id {}", user.getId());
        return LoginResponse.builder()
                .token(token)
                .user(helperResponse)
                .build();
    }

    @Override
    public void verifyEmail(String email) {
        UserEntity user = userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found for this email address."));
        user.setEmailVerified(true);
        userRepository.save(user);
        log.info("Email verified for user id {}", user.getId());
    }
}
