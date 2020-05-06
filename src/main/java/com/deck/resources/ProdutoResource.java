package com.deck.resources;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deck.dto.ProdutoDTO;
import com.deck.models.Produto;
import com.deck.repository.ProdutoRepository;

@CrossOrigin
@RestController
@RequestMapping(value="/produto")
public class ProdutoResource {
	
	@Autowired
	ProdutoRepository produtoRepository;
	
	@GetMapping("/getAll")
	public List<ProdutoDTO> getAllProduto() {
		List<ProdutoDTO> listProdutoDTO = new LinkedList<ProdutoDTO>();
		int posicao = 0;
		for (Produto p : produtoRepository.findAll()) {
			ProdutoDTO pDTO = new ProdutoDTO(p);
			pDTO.setPosicao(posicao);
			listProdutoDTO.add(pDTO);
			posicao += 1;
		}
		return listProdutoDTO;
	}
	
	@GetMapping("/get/{id}")
	public Produto getProduto (@PathVariable(value="id") long id) {
		return produtoRepository.findByid(id);
	}
	
	@PostMapping("/add")
	public Produto addProduto (@RequestBody Produto produto) {
		return produtoRepository.save(produto);
	}
	
	@PutMapping("/modify/{id}")
	public Produto modifyProduto (@PathVariable(value="id") long id, @RequestBody Produto produto) {
		Produto p = produtoRepository.findByid(id);
		p.setNome(produto.getNome());
		p.setDescricao(produto.getNome());
		p.setPreco(produto.getPreco());
		return produtoRepository.save(p);
	}
	
	@DeleteMapping("/delete/{id}")
	public void removeProduto (@PathVariable(value="id") long id) {
		produtoRepository.deleteById(id);
	}
}
