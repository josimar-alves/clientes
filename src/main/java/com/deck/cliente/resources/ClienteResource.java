package com.deck.cliente.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deck.cliente.models.Cliente;
import com.deck.cliente.repository.ClienteRepository;

@RestController
@RequestMapping(value="/cliente")
public class ClienteResource {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	@GetMapping("/getAll")
	public List<Cliente> listaClitentes() {
		return clienteRepository.findAll();
	}
	
	@GetMapping("/get/{id}")
	public Cliente getCliente (@PathVariable(value="id") long id) {
		return clienteRepository.findByid(id);
	}
	
	@PostMapping("/addCliente")
	public Cliente addCliente (@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}
	
	@PutMapping("/modifyCliente")
	public Cliente modifyCliente (@RequestBody Cliente cliente) {
		return clienteRepository.save(cliente);
	}
	
	@DeleteMapping("/removeCliente")
	public void removeCliente (@RequestBody Cliente cliente) {
		clienteRepository.delete(cliente);
	}
}
