package com.Assessment.product_management_api.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Request payload for verifying an OTP sent to a user's email")
public class OtpVerificationRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Provide a valid email format")
    @Schema(example = "user@example.com", description = "Email address associated with the OTP")
    private String email;

    @NotBlank(message = "OTP is required")
    @Pattern(regexp = "^[0-9]{6}$", message = "OTP must be a 6-digit number")
    @Schema(example = "123456", description = "6-digit OTP received in the email")
    private String otp;
}
