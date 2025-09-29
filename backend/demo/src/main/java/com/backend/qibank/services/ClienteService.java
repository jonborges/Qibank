package com.backend.qibank.services;

import com.backend.qibank.exception.AuthenticationException;
import com.backend.qibank.exception.ClienteExistenteException;
import com.backend.qibank.exception.NotFoundException;
import com.backend.qibank.exception.OperacaoFinanceiraException;
import com.backend.qibank.model.Cliente;
import com.backend.qibank.repository.ClienteRepository;
import com.backend.qibank.util.CpfValidator;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.qibank.data.dto.CriarClienteRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EncryptionService encryptionService;

    public Cliente criarConta(CriarClienteRequestDTO clienteDTO) {
        if (!CpfValidator.isCpfValido(clienteDTO.getCpf())) {
            throw new OperacaoFinanceiraException("CPF inválido.");
        }
        
        // Verifica se o e-mail já existe
        if (clienteRepository.findByEmail(clienteDTO.getEmail()).isPresent()) {
            throw new ClienteExistenteException("Este e-mail já está em uso.");
        }
        
        // Gera o hash do CPF para busca e verifica se já existe
        String cpfHash = encryptionService.createHmac(clienteDTO.getCpf());
        if (clienteRepository.findByCpfHash(cpfHash).isPresent()) {
            throw new ClienteExistenteException("Este CPF já está cadastrado.");
        }

        Cliente novoCliente = new Cliente();
        novoCliente.setNome(clienteDTO.getNome());
        novoCliente.setEmail(clienteDTO.getEmail());

        // Criptografa a senha e o CPF, e armazena o hash do CPF
        novoCliente.setPassword(passwordEncoder.encode(clienteDTO.getPassword()));
        novoCliente.setCpf(encryptionService.encrypt(clienteDTO.getCpf()));
        novoCliente.setCpfHash(cpfHash);

        novoCliente.setSaldo(BigDecimal.ZERO);

        return clienteRepository.save(novoCliente);
    }

    public Cliente login(String email, String password) {
        Cliente cliente = clienteRepository.findByEmail(email)
                .orElseThrow(() -> new AuthenticationException("Credenciais inválidas."));

        if (!passwordEncoder.matches(password, cliente.getPassword())) {
            throw new AuthenticationException("Credenciais inválidas.");
        }

        return cliente;
    }

    public List<Cliente> listarTodos() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(String id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Cliente não encontrado com o ID: " + id));
    }

    public Cliente depositar(String id, BigDecimal valor) {
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new OperacaoFinanceiraException("O valor do depósito deve ser positivo.");
        }
        // Usar uma operação atômica para evitar condições de corrida
        Cliente cliente = buscarPorId(id);
        cliente.setSaldo(cliente.getSaldo().add(valor));
        return clienteRepository.save(cliente);
    }

    @Transactional
    public Cliente sacar(String id, BigDecimal valor) {
        if (valor.compareTo(BigDecimal.ZERO) <= 0) {
            throw new OperacaoFinanceiraException("O valor do saque deve ser positivo.");
        }

        // A anotação @Transactional garante que a leitura e a escrita sejam atômicas.
        Cliente cliente = buscarPorId(id);

        if (cliente.getSaldo().compareTo(valor) < 0) {
            throw new OperacaoFinanceiraException("Saldo insuficiente para realizar o saque.");
        }

        cliente.setSaldo(cliente.getSaldo().subtract(valor));
        return clienteRepository.save(cliente);
    }

    public void adicionarComentario(String id, String comentario) {
        // Lógica para ser implementada:
        // 1. Buscar o cliente pelo ID.
        // 2. Adicionar o comentário a uma lista de comentários no modelo Cliente (seria necessário criar esse campo).
        // 3. Salvar o cliente.
        System.out.println("Funcionalidade de comentário a ser implementada para o cliente " + id);
    }

    public Cliente alterarEmail(String id, String novoEmail) {
        if (clienteRepository.findByEmail(novoEmail).isPresent()) {
            throw new ClienteExistenteException("Este e-mail já está em uso.");
        }
        Cliente cliente = buscarPorId(id);
        cliente.setEmail(novoEmail);
        return clienteRepository.save(cliente);
    }

    public Cliente alterarSenha(String id, String senhaAtual, String novaSenha) {
        Cliente cliente = buscarPorId(id);

        if (!passwordEncoder.matches(senhaAtual, cliente.getPassword())) {
            throw new AuthenticationException("A senha atual está incorreta.");
        }

        cliente.setPassword(passwordEncoder.encode(novaSenha));
        return clienteRepository.save(cliente);
    }

    public void deletarConta(String id) {
        Cliente cliente = buscarPorId(id);
        clienteRepository.delete(cliente);
    }
}