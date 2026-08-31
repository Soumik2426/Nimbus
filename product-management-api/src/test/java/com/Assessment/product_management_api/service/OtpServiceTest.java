package com.Assessment.product_management_api.service;

import com.Assessment.product_management_api.service.impl.OtpServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OtpServiceTest {

    @Mock
    private RedisService redisService;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private OtpServiceImpl otpService;

    @Test
    void sendOtp_shouldStoreOtpAndSendEmail() {
        ReflectionTestUtils.setField(otpService, "otpTtlMinutes", 5L);

        assertDoesNotThrow(() -> otpService.sendOtp("user@example.com"));

        verify(redisService).save(any(), any(), eq(Duration.ofMinutes(5)));
        verify(emailService).sendOtpEmail(eq("user@example.com"), any());
    }

    @Test
    void verifyOtp_shouldDeleteOtpAfterSuccessfulValidation() {
        when(redisService.get("otp:user@example.com")).thenReturn("123456");

        assertDoesNotThrow(() -> otpService.verifyOtp("user@example.com", "123456"));

        verify(redisService).delete("otp:user@example.com");
        assertEquals("123456", redisService.get("otp:user@example.com"));
    }

    @Test
    void sendOtp_shouldFailWithClearMessageWhenRedisIsUnavailable() {
        ReflectionTestUtils.setField(otpService, "otpTtlMinutes", 5L);
        doThrow(new RedisConnectionFailureException("Connection refused")).when(redisService).save(any(), any(), any());

        IllegalStateException exception = assertThrows(IllegalStateException.class,
                () -> otpService.sendOtp("user@example.com"));

        assertEquals("OTP service unavailable: Redis is not reachable.", exception.getMessage());
    }
}
