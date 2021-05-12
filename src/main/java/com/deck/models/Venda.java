package com.deck.models;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TB_VENDA")
public class Venda implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
		
	@ManyToOne
	private Cliente cliente;
	
	private Date data;
	private String obs;
	private double total;	
	private double troco;
	private double adicional;
	private double entrega;
	private boolean cartao;
	private String pagamento;

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public double getTroco() {
		return troco;
	}
	
	public void setTroco(double troco) {
		this.troco = troco;
	}

	public String getObs() {
		return obs;
	}

	public void setObs(String observacoes) {
		this.obs = observacoes;
	}

	public String getData() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy 'às' HH:mm:ss");   
		return formatter.format(data);
	}

	public void setData(Date data) {
		this.data = data;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public double getAdicional() {
		return adicional;
	}

	public void setAdicional(double adicional) {
		this.adicional = adicional;
	}

	public double getEntrega() {
		return entrega;
	}

	public void setEntrega(double entrega) {
		this.entrega = entrega;
	}

	public boolean isCartao() {
		return cartao;
	}

	public void setCartao(boolean cartao) {
		this.cartao = cartao;
	}
	
	public String getPagamento() {
		return this.pagamento;
	}
	
	public void setPagamento(String pagamento) {
		this.pagamento = pagamento;
	}
}
