package com.Assessment.product_management_api.service.impl;

import com.Assessment.product_management_api.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisServiceImpl implements RedisService {
    private final StringRedisTemplate stringRedisTemplate;

    //Used to store the information in Redis and automatically remove it after "ttl" times
    @Override
    public void save(String key, String value, Duration ttl) {
        stringRedisTemplate.opsForValue().set(key, value, ttl);
    }

    //Go to Redis and get me the value stored against this key
    @Override
    public String get(String key) {
        return stringRedisTemplate.opsForValue().get(key);
    }

    //Used to completely delete an entry form the redis after successful useage
    @Override
    public void delete(String key) {
        stringRedisTemplate.delete(key);
    }

    //Used to tell whether this key is present or not
    @Override
    public boolean exists(String key) {
        Boolean exists = stringRedisTemplate.hasKey(key);
        return Boolean.TRUE.equals(exists);
    }
}
