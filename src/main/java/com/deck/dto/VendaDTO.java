package com.deck.dto;

import java.util.List;

import com.deck.models.ItemVenda;
import com.deck.models.Venda;

public class VendaDTO {
	
	private List<ItemVenda> items;
	
	private Venda venda;

	public List<ItemVenda> getItems() {
		return items;
	}

	public void setItems(List<ItemVenda> items) {
		this.items = items;
	}

	public Venda getVenda() {
		return venda;
	}

	public void setVenda(Venda venda) {
		this.venda = venda;
	}

}
