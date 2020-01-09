package com.deck.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Table(name = "TB_VENDA")
public class Venda implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Autowired
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinTable(name="TB_VENDA_PRODUTO", joinColumns={@JoinColumn(name = "ID_VENDA")})
	private List<Produto> listaDeCompra;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Produto> getListaDeCompra() {
		return listaDeCompra;
	}

	public void setListaDeCompra(List<Produto> lista) {
		this.listaDeCompra = lista;
	}
	
	public double getValorTotal () {
		double total = 0.0;
		for (Produto produto : listaDeCompra) {
			total += produto.getPreco();
		}
		return total;
	}

}
