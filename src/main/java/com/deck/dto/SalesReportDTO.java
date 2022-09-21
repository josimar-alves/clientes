package com.deck.dto;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SalesReportDTO {

	private Date data;
	private double total;	
	

	public SalesReportDTO(Date data, double total) {
		this.data = data;
		this.total = total;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public String getData() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");   
		return formatter.format(data);
	}

	public void setData(Date data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "Venda [id=" + ", data=" + data + ", total=" + total + "]";
	}
}
