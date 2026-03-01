package com.example.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.DriverManager;

import redis.clients.jedis.Jedis;

@SpringBootApplication
@RestController
public class DemoApplication {

    @GetMapping("/")
    public String testAll() {

        String dbStatus;
        String redisStatus;

        // Test Postgres
        try {
            Connection conn = DriverManager.getConnection(
                    "jdbc:postgresql://db:5432/postgres",
                    "postgres",
                    "password"
            );
            conn.close();
            dbStatus = "Postgres OK";
        } catch (Exception e) {
            dbStatus = "Postgres Failed";
        }

        // Test Redis
        try {
            Jedis jedis = new Jedis("redis", 6379);
            jedis.set("testkey", "HelloRedis");

            String value = jedis.get("testkey");

            redisStatus = "Redis OK: " + value;

            jedis.close();

        } catch (Exception e) {

            redisStatus = "Redis Failed";
        }

        return dbStatus + " | " + redisStatus;
    }

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}