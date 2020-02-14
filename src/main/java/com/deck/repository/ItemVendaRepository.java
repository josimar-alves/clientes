package com.deck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.deck.models.ItemVenda;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {

	@Query(nativeQuery = true, value = "select * from tb_item_venda as iv where iv.venda_id = ?1")
	List<ItemVenda> findItemVendaByVenda(Long idVenda);	
}
