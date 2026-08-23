package com.freshtrack.backend.config;

import com.google.genai.Client;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GeminiClientConfig {

    @Bean
    public Client geminiClient(GeminiConfig geminiConfig) {
        return Client.builder()
                .apiKey(geminiConfig.getApiKey())
                .build();
    }
}