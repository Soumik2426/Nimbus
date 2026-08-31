package com.Assessment.product_management_api.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="users",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})},
        indexes = {@Index(name = "idx_firstName", columnList = "first_name"),
                    @Index(name="idx_lastName", columnList = "last_name"),
                    @Index(name="idx_email", columnList = "email"),
                    @Index(name="idx_role", columnList = "role")}
)
@Builder
public class UserEntity extends BaseEntity {
    @Column(name = "first_name", nullable = false, length = 100)
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    private String lastName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Builder.Default
    @Column(name = "email_verified", nullable = false)
    private boolean emailVerified = false;
}
