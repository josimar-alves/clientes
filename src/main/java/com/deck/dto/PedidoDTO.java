package com.deck.dto;

public class PedidoDTO {
	private String IDVenda;
	private String nome;
	private String telefone;
	private String pedido;
	private String obs;
	private String data;
	private String total;
	private String troco;

	public String getIDVenda() {
		return IDVenda;
	}

	public void setIDVenda(String iDVenda) {
		IDVenda = iDVenda;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getPedido() {
		return pedido;
	}

	public void setPedido(String pedido) {
		this.pedido = pedido;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String obs) {
		this.obs = obs;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getTroco() {
		return troco;
	}

	public void setTroco(String troco) {
		this.troco = troco;
	}

}
