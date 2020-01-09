package com.deck.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deck.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository <Produto, Long> {
	
	Produto findByid(long id);

}
