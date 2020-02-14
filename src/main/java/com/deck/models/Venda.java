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
}
