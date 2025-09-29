package com.backend.qibank.repository;

import com.backend.qibank.model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClienteRepository extends MongoRepository<Cliente, String> {
    Optional<Cliente> findByEmail(String email);
    Optional<Cliente> findByCpfHash(String cpfHash);
}