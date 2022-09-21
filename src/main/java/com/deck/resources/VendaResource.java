package com.deck.resources;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.deck.dto.PedidoDTO;
import com.deck.dto.SalesProductReportDTO;
import com.deck.dto.VendaDTO;
import com.deck.dto.SalesReportDTO;
import com.deck.models.ItemVenda;
import com.deck.models.Produto;
import com.deck.models.Venda;
import com.deck.repository.ItemVendaRepository;
import com.deck.repository.ProdutoRepository;
import com.deck.repository.VendaRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/venda")
public class VendaResource {

	@Autowired
	VendaRepository vendaRepository;
	ProdutoRepository produtoRepository;

	@Autowired
	private ItemVendaRepository itemVendaRepository;

	@GetMapping("/getAll")
	public List<Venda> listaClitentes() {
		return vendaRepository.findAll();
	}

	@GetMapping("/getAllSales")
	public List<Venda> listAllSales() {
		return vendaRepository.getAllSales();
	}

	@GetMapping("/get/{id}")
	public Venda getVenda(@PathVariable(value = "id") long id) {
		return vendaRepository.findByid(id);
	}

	@PostMapping("/add")
	public Venda addVenda(@RequestBody List<Produto> lista) {
		List<Produto> produtos = new LinkedList<Produto>();
		Venda venda = new Venda();

		for (Produto p : lista) {
			produtos.add(produtoRepository.findByid(p.getId()));
		}

		// venda.setListaDeCompra(produtos);
		return vendaRepository.save(venda);
	}

	@PutMapping("/modify")
	public Venda modifyVenda(@RequestBody Venda venda) {
		return vendaRepository.save(venda);
	}

	@DeleteMapping("/delete")
	public void removeVenda(@RequestBody Venda venda) {
		vendaRepository.delete(venda);
	}

	@PostMapping("/addTest")
	public Venda addVendaTest(@RequestBody VendaDTO dto) {
		Venda venda = dto.getVenda();
		venda.setData(new Date());
		venda = vendaRepository.save(venda);

		for (ItemVenda item : dto.getItems()) {
			if (item.getQuantidade() != null && item.getQuantidade() != 0) {
				item.setVenda(venda);
				itemVendaRepository.save(item);
			}
		}
		return venda;
	}

	@PutMapping("/modifyTest")
	public Venda modifyVendaTest(@RequestBody VendaDTO dto) {
		Venda venda = dto.getVenda();
		venda.setData(new Date());
		venda = vendaRepository.save(venda);

		for (ItemVenda item : dto.getItems()) {
			if (item.getQuantidade() != null && item.getQuantidade() != 0) {
				item.setVenda(venda);
				itemVendaRepository.save(item);
			}
		}
		return venda;
	}

	@Transactional
	@DeleteMapping("/deleteItems/{id}")
	public void deleteItemsVenda(@PathVariable(value = "id") long id) {
		itemVendaRepository.deleteItemsVendas(id);
	}

	@Transactional
	@DeleteMapping("/deleteVenda/{id}")
	public void deleteVenda(@PathVariable(value = "id") long id) {
		itemVendaRepository.deleteItemsVendas(id);
		vendaRepository.deleteVenda(id);
	}

	@GetMapping("/getTest/{id}")
	public VendaDTO getVendaTest(@PathVariable(value = "id") long id) {
		List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(id);
		if (items.size() > 0) {
			VendaDTO vendaDTO = new VendaDTO();
			vendaDTO.setVenda(items.get(0).getVenda());
			List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();

			for (ItemVenda i : items) {
				i.setVenda(null);
				itemsAux.add(i);
			}
			vendaDTO.setItems(itemsAux);
			return vendaDTO;
		} else {
			return null;
		}
	}

	@GetMapping("/getAllTest")
	public List<VendaDTO> getAllVendas() {
		List<VendaDTO> allVendas = new LinkedList<VendaDTO>();

		for (Venda v : vendaRepository.findAll()) {
			List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(v.getId());
			VendaDTO vendaDTO = new VendaDTO();
			vendaDTO.setVenda(items.get(0).getVenda());

			List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();
			for (ItemVenda i : items) {
				i.setVenda(null);
				itemsAux.add(i);
			}
			vendaDTO.setItems(itemsAux);
			allVendas.add(vendaDTO);
		}
		return allVendas;
	}

	@GetMapping("/getAllPedidos")
	public List<PedidoDTO> getAllPedidos() {

		List<PedidoDTO> allPedidos = new LinkedList<PedidoDTO>();

		for (Venda v : vendaRepository.findAll()) {
			List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(v.getId());
			VendaDTO vendaDTO = new VendaDTO();
			vendaDTO.setVenda(items.get(0).getVenda());

			List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();
			for (ItemVenda i : items) {
				i.setVenda(null);
				itemsAux.add(i);
			}
			vendaDTO.setItems(itemsAux);
			allPedidos.add(this.getPedido(vendaDTO));
		}
		return allPedidos;
	}

	@GetMapping("/getAllPedidosWithDate/{date}")
	public List<PedidoDTO> getAllPedidosWithDate(@PathVariable(value = "date") String date) throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dataInicio = sdf.parse(date);
		// Date dataInicioT = sdf.parse("2020-12-17");
		Date dataFim = new Date(dataInicio.getTime() + (24 * 60 * 60 * 1000) - 1);

		return getDataByDate(dataInicio, dataFim);
	}

	private List<PedidoDTO> getDataByDate(Date dataInicial, Date dataFinal) {
		List<PedidoDTO> allPedidos = new LinkedList<PedidoDTO>();

		for (Venda v : vendaRepository.findAllWithData(dataInicial, dataFinal)) {
			List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(v.getId());
			VendaDTO vendaDTO = new VendaDTO();
			vendaDTO.setVenda(items.get(0).getVenda());

			List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();
			for (ItemVenda i : items) {
				i.setVenda(null);
				itemsAux.add(i);
			}
			vendaDTO.setItems(itemsAux);
			allPedidos.add(this.getPedido(vendaDTO));
		}
		return allPedidos;
	}

	@GetMapping("/getReportByDateRange/{initialDate}/{finalDate}")
	public List<SalesReportDTO> getReportByDateRange(@PathVariable String initialDate,
			@PathVariable String finalDate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dataInicial = sdf.parse(initialDate);
		Date dataFinal = sdf.parse(finalDate);

		List<SalesReportDTO> vendas = new LinkedList<SalesReportDTO>();
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyy");

		String auxDate = "";
		double auxTotal = 0;
		for (Venda v : vendaRepository.findAllWithData(dataInicial, dataFinal)) {
			String subDate = v.getData().substring(0, 10);
			
			if (auxDate.equals("")) {
				auxDate = subDate;
			}
			
			if (auxDate.equals(subDate)) {
				auxTotal += v.getTotal();
			} else {
				vendas.add(new SalesReportDTO(formatter.parse(auxDate), auxTotal));
				auxDate = subDate;
				auxTotal = v.getTotal();
			}
		}

		vendas.add(new SalesReportDTO(formatter.parse(auxDate), auxTotal));
		
		Collections.reverse(vendas);

		return vendas;
	}
	
	@GetMapping("/getProductSalesQuantityByDateRange/{initialDate}/{finalDate}")
	public List<SalesProductReportDTO> getProductSalesQuantityByDateRange(@PathVariable String initialDate,
			@PathVariable String finalDate) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dataInicial = sdf.parse(initialDate);
		Date dataFinal = sdf.parse(finalDate);

		List<SalesProductReportDTO> produtosPorVendas = new LinkedList<SalesProductReportDTO>();
		List<SalesProductReportDTO> produtosPorVendasAux = new LinkedList<SalesProductReportDTO>();
		List<ItemVenda> items = new LinkedList<>();
		
		for (Venda v : vendaRepository.findAllWithData(dataInicial, dataFinal)) {
			items.addAll(itemVendaRepository.findItemVendaByVenda(v.getId()));
		}
		
		for (ItemVenda i: items) {
			if (i.getProduto().getTipo().equals("hamburguer")) {
				produtosPorVendasAux.add(new SalesProductReportDTO(i.getProduto().getNome(), i.getQuantidade()));
			}
		}
		
		Map<Object, List<SalesProductReportDTO>> listSales =
				produtosPorVendasAux.stream().collect(Collectors.groupingBy(item -> item.getName()));
		
		listSales.forEach((key, value) -> {
			Integer totalPerItem = 0;
			for (SalesProductReportDTO item: value) {
				totalPerItem += item.getQuantity();
			}
			
			produtosPorVendas.add(new SalesProductReportDTO(key.toString(), totalPerItem));
		});
		
		return produtosPorVendas;
	}

	private List<PedidoDTO> getDataReportByDate(Date dataInicial, Date dataFinal) {
		List<PedidoDTO> allPedidos = new LinkedList<PedidoDTO>();

		for (Venda v : vendaRepository.findAllWithData(dataInicial, dataFinal)) {
			List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(v.getId());

			VendaDTO vendaDTO = new VendaDTO();
			vendaDTO.setVenda(items.get(0).getVenda());

			List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();
			for (ItemVenda i : items) {
				i.setVenda(null);
				itemsAux.add(i);
			}
			vendaDTO.setItems(itemsAux);
			allPedidos.add(this.getPedido(vendaDTO));
		}
		return allPedidos;
	}

	private PedidoDTO getPedido(VendaDTO venda) {
		PedidoDTO pedido = new PedidoDTO();

		pedido.setIDVenda("" + venda.getVenda().getId());
		pedido.setNome(venda.getVenda().getCliente().getNome());
		pedido.setTelefone(venda.getVenda().getCliente().getTelefone());
		pedido.setPedido(pedidosToString(venda.getItems()));
		pedido.setObs(venda.getVenda().getObs());
		pedido.setData(venda.getVenda().getData());
		pedido.setTotal("" + venda.getVenda().getTotal());
		pedido.setTroco("" + venda.getVenda().getTroco());

		return pedido;
	}

	private String pedidosToString(List<ItemVenda> vendas) {
		String str = "";

		for (ItemVenda itemVenda : vendas) {
			str += itemVenda.itemToString() + "; ";
		}
		return str.substring(0, str.length() - 2);
	}

}
