package com.deck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deck.models.Produto;

public interface ProdutoRepository extends JpaRepository <Produto, Long> {
	
	Produto findByid(long id);

}
