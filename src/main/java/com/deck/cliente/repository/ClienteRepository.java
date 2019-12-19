package com.deck.cliente.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deck.cliente.models.Cliente;

public interface ClienteRepository extends JpaRepository <Cliente, Long> {
	
	Cliente findByid(long id);

}
