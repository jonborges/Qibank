package com.backend.qibank.util;

import java.util.Arrays;
import java.util.List;

public class CpfValidator {

    private static final List<String> INVALID_CPFS = Arrays.asList(
            "00000000000", "11111111111", "22222222222", "33333333333",
            "44444444444", "55555555555", "66666666666", "77777777777",
            "88888888888", "99999999999"
    );

    public static boolean isCpfValido(String cpf) {
        if (cpf == null) return false;

        String cleanedCpf = cpf.replaceAll("[^0-9]", "");

        if (cleanedCpf.length() != 11 || INVALID_CPFS.contains(cleanedCpf)) {
            return false;
        }

        try {
            
            int sum = 0;
            for (int i = 0; i < 9; i++) {
                sum += (cleanedCpf.charAt(i) - '0') * (10 - i);
            }
            int firstDigit = 11 - (sum % 11);
            if (firstDigit >= 10) {
                firstDigit = 0;
            }
            if ((cleanedCpf.charAt(9) - '0') != firstDigit) {
                return false;
            }

            
            sum = 0;
            for (int i = 0; i < 10; i++) {
                sum += (cleanedCpf.charAt(i) - '0') * (11 - i);
            }
            int secondDigit = 11 - (sum % 11);
            if (secondDigit >= 10) {
                secondDigit = 0;
            }

            return (cleanedCpf.charAt(10) - '0') == secondDigit;
        } catch (Exception e) {
            return false;
        }
    }
}