package com.deck.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.deck.models.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository <Cliente, Long> {
	
	Cliente findByid(long id);
}
