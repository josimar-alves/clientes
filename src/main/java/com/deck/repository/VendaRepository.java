package com.deck.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.deck.models.Venda;

public interface VendaRepository extends JpaRepository <Venda, Long> {
	
	Venda findByid(long id);

}
