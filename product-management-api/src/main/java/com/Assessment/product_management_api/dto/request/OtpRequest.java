package com.Assessment.product_management_api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request payload for sending OTP to a user's email")
public class OtpRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Provide a valid email format")
    @Schema(example = "user@example.com", description = "Email address to receive the OTP")
    private String email;
}
