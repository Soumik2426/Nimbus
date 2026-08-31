package com.Assessment.product_management_api.service;

import com.Assessment.product_management_api.dto.request.LoginRequest;
import com.Assessment.product_management_api.dto.request.RegisterRequest;
import com.Assessment.product_management_api.dto.response.LoginResponse;
import com.Assessment.product_management_api.dto.response.UserResponse;

public interface AuthService {

    //To create a new user
    public UserResponse registerUser(RegisterRequest registerRequest);

    //To login
    public LoginResponse login(LoginRequest loginRequest);

    void verifyEmail(String email);
}
