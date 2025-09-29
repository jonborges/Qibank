package com.backend.qibank.controllers;

import com.backend.qibank.data.dto.ClienteResponseDTO;
import com.backend.qibank.data.dto.CriarClienteRequestDTO;
import com.backend.qibank.data.dto.AlterarEmailRequestDTO;
import com.backend.qibank.data.dto.AlterarSenhaRequestDTO;
import com.backend.qibank.model.Cliente;
import com.backend.qibank.services.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<ClienteResponseDTO> listarClientes() {
        return clienteService.listarTodos()
                .stream()
                .map(ClienteResponseDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> buscarClientePorId(@PathVariable String id) {
        Cliente cliente = clienteService.buscarPorId(id);
        return ResponseEntity.ok(new ClienteResponseDTO(cliente));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponseDTO criarCliente(@RequestBody CriarClienteRequestDTO clienteDTO) {
        Cliente novoCliente = clienteService.criarConta(clienteDTO);
        return new ClienteResponseDTO(novoCliente);
    }

    @PostMapping("/{id}/depositar")
    public ResponseEntity<ClienteResponseDTO> depositar(@PathVariable String id, @RequestBody Map<String, String> request) {
        BigDecimal valor = new BigDecimal(request.get("valor"));
        Cliente clienteAtualizado = clienteService.depositar(id, valor);
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }

    @PostMapping("/{id}/sacar")
    public ResponseEntity<ClienteResponseDTO> sacar(@PathVariable String id, @RequestBody Map<String, String> request) {
        BigDecimal valor = new BigDecimal(request.get("valor"));
        Cliente clienteAtualizado = clienteService.sacar(id, valor);
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<ClienteResponseDTO> alterarEmail(@PathVariable String id, @RequestBody AlterarEmailRequestDTO request) {
        Cliente clienteAtualizado = clienteService.alterarEmail(id, request.getNovoEmail());
        return ResponseEntity.ok(new ClienteResponseDTO(clienteAtualizado));
    }

    @PutMapping("/{id}/senha")
    public ResponseEntity<Void> alterarSenha(@PathVariable String id, @RequestBody AlterarSenhaRequestDTO request) {
        clienteService.alterarSenha(id, request.getSenhaAtual(), request.getNovaSenha());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deletarConta(@PathVariable String id) {
        clienteService.deletarConta(id);
        return ResponseEntity.noContent().build();
    }
}