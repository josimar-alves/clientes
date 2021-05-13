package com.deck.dto;

import com.deck.models.Produto;

public class ProdutoDTO {
	private long id;
	private String nome;
	private String descricao;
	private double preco;
	private int quantidade;
	private int posicao;
	private String tipo;
	
	public int getPosicao() {
		return posicao;
	}

	public void setPosicao(int posicao) {
		this.posicao = posicao;
	}

	public ProdutoDTO(Produto p){
		this.id = p.getId();
		this.nome = p.getNome();
		this.descricao = p.getDescricao();
		this.preco = p.getPreco();
		this.quantidade = 0;
		this.tipo = p.getTipo();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}
	
	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
}
