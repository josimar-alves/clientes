package com.deck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.deck.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository <Cliente, Long> {
	
	Cliente findByid(long id);
	
	@Query(nativeQuery = true, value = "select * from tb_cliente ORDER BY nome")
	List<Cliente> findAll();	
}
