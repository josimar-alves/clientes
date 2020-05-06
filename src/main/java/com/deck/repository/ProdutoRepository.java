package com.deck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.deck.models.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository <Produto, Long> {
	
	Produto findByid(long id);
	
	@Query(nativeQuery = true, value = "select * from tb_produto ORDER BY id_produto")
	List<Produto> findAll();

}
