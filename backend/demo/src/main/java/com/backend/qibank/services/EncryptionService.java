package com.backend.qibank.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.Mac;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import jakarta.annotation.PostConstruct;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.GeneralSecurityException;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final String ALGORITHM = "AES";
    private static final String HMAC_ALGORITHM = "HmacSHA256";
    private static final String ALGORITHM_MODE = "AES/GCM/NoPadding";
    private static final int GCM_IV_LENGTH = 12; // 96 bits
    private static final int GCM_TAG_LENGTH = 128; // 128 bits

    @Value("${encryption.key}") 
    private String key;
    private SecretKeySpec secretKey;
    
    @Value("${encryption.hmac-key}") 
    private String hmacKey;
    private SecretKeySpec hmacSecretKey;

    @PostConstruct
    public void init() {
        this.secretKey = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        this.hmacSecretKey = new SecretKeySpec(hmacKey.getBytes(StandardCharsets.UTF_8), HMAC_ALGORITHM);
    }

    public String encrypt(String data) {
        try {
            byte[] iv = new byte[GCM_IV_LENGTH];
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGORITHM_MODE);
            GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, gcmParameterSpec);

            byte[] encryptedData = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));

            // Concatena IV + dados criptografados para armazenar
            byte[] encryptedDataWithIv = new byte[GCM_IV_LENGTH + encryptedData.length];
            System.arraycopy(iv, 0, encryptedDataWithIv, 0, GCM_IV_LENGTH);
            System.arraycopy(encryptedData, 0, encryptedDataWithIv, GCM_IV_LENGTH, encryptedData.length);

            return Base64.getEncoder().encodeToString(encryptedDataWithIv);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException("Erro ao criptografar dados", e);
        }
    }

    public String decrypt(String encryptedData) {
        try {
            byte[] decodedDataWithIv = Base64.getDecoder().decode(encryptedData);

            // Extrai o IV
            byte[] iv = new byte[GCM_IV_LENGTH];
            System.arraycopy(decodedDataWithIv, 0, iv, 0, GCM_IV_LENGTH);

            Cipher cipher = Cipher.getInstance(ALGORITHM_MODE);
            GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
            cipher.init(Cipher.DECRYPT_MODE, secretKey, gcmParameterSpec);
            return new String(cipher.doFinal(decodedDataWithIv, GCM_IV_LENGTH, decodedDataWithIv.length - GCM_IV_LENGTH));
        } catch (GeneralSecurityException e) {
            throw new RuntimeException("Erro ao descriptografar dados", e);
        }
    }

    public String createHmac(String data) {
        try {
            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
            mac.init(hmacSecretKey);
            byte[] hmacBytes = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hmacBytes);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException("Erro ao gerar HMAC", e);
        }
    }
}