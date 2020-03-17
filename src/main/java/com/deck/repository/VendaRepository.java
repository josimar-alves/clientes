package com.deck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.deck.models.Venda;

public interface VendaRepository extends JpaRepository <Venda, Long> {
	
	Venda findByid(long id);
	
	@Query(nativeQuery = true, value = "select * from tb_venda ORDER BY data DESC")
	List<Venda> findAll();	

	@Modifying
	@Query(nativeQuery = true, value = "delete from tb_venda as iv where iv.id = ?1")
	void deleteVenda(Long idVenda);
}
