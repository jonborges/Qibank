package com.backend.qibank;

import com.backend.qibank.repository.ClienteRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class MongoConnectionTest {

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    @DisplayName("Deve injetar o ClienteRepository e conectar ao MongoDB")
    void testMongoDbConnection() {
        assertNotNull(clienteRepository, "O ClienteRepository não foi injetado. Verifique a configuração do Spring e se a anotação @Repository está presente.");
        Assertions.assertDoesNotThrow(() -> {
            System.out.println("Tentando executar a operação count() no MongoDB...");
            long count = clienteRepository.count();
            System.out.println("Operação count() executada com sucesso. Número de documentos: " + count);
        }, "Falha ao executar operação no MongoDB. Verifique a string de conexão em 'application.properties' e se o serviço do MongoDB está rodando.");

        System.out.println("Teste de conexão com o MongoDB passou com sucesso!");
    }
}