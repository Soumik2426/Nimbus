package com.Assessment.product_management_api.dto.response;

import com.Assessment.product_management_api.entity.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Schema(description = "Sanitized user details returned after registration")
public class UserResponse {
    @Schema(example = "1")
    private Long id;
    @Schema(example = "Soumik")
    private String firstName;
    @Schema(example = "Das")
    private String lastName;
    @Schema(example = "soumik@example.com")
    private String email;
    private boolean emailVerified;
    @Schema(example = "USER")
    private Role role;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(example = "2026-07-03 12:00:00")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @Schema(example = "2026-07-03 12:00:00")
    private LocalDateTime updatedAt;
}
