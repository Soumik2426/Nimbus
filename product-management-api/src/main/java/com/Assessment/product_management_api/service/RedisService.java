package com.Assessment.product_management_api.service;

import java.time.Duration;

public interface RedisService {
    void save(String key, String value, Duration ttl);
    String get(String key);
    void delete(String key);
    boolean exists(String key);
}
