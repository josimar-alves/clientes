package com.deck.dto;

public class SalesProductReportDTO {
	
	private Integer quantity;
	private String name;
	
	public SalesProductReportDTO(String name, Integer quantity) {
		this.name = name;
		this.quantity = quantity;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "SalesProductReportDTO [name=" + name + ", quantity=" + quantity + "]";
	}
	
}
