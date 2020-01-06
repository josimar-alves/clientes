package com.deck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deck.models.Cliente;

public interface ClienteRepository extends JpaRepository <Cliente, Long> {
	
	Cliente findByid(long id);

}
