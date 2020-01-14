package com.deck.resources;

import java.util.LinkedList;
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

import com.deck.models.Produto;
import com.deck.models.Venda;
import com.deck.repository.ProdutoRepository;
import com.deck.repository.VendaRepository;

@RestController
@RequestMapping(value="/venda")
public class VendaResource {
	
	@Autowired
	VendaRepository vendaRepository;
	ProdutoRepository produtoRepository;
	
	@GetMapping("/getAll")
	public List<Venda> listaClitentes() {
		return vendaRepository.findAll();
	}
	
	@GetMapping("/get/{id}")
	public Venda getVenda (@PathVariable(value="id") long id) {
		return vendaRepository.findByid(id);
	}
	
	@PostMapping("/add")
	public Venda addVenda (@RequestBody List<Produto> lista) {
		List<Produto> produtos = new LinkedList<Produto>();
		Venda venda = new Venda();
				
		for (Produto p : lista) {
			produtos.add(produtoRepository.findByid(p.getId()));
		}
		
		venda.setListaDeCompra(produtos);
		return vendaRepository.save(venda);
	}
	
	@PutMapping("/modify")
	public Venda modifyVenda (@RequestBody Venda venda) {
		return vendaRepository.save(venda);
	}
	
	@DeleteMapping("/delete")
	public void removeVenda (@RequestBody Venda venda) {
		vendaRepository.delete(venda);
	}
}
