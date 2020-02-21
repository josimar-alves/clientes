package com.deck.resources;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

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
import com.deck.dto.VendaDTO;
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

	@GetMapping("/getTest/{id}")
	public VendaDTO getVendaTest(@PathVariable(value = "id") long id) {
		List<ItemVenda> items = itemVendaRepository.findItemVendaByVenda(id);
		VendaDTO vendaDTO = new VendaDTO();
		vendaDTO.setVenda(items.get(0).getVenda());

		List<ItemVenda> itemsAux = new LinkedList<ItemVenda>();
		for (ItemVenda i : items) {
			i.setVenda(null);
			itemsAux.add(i);
		}

		vendaDTO.setItems(itemsAux);
		return vendaDTO;
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

	private PedidoDTO getPedido(VendaDTO venda) {
		PedidoDTO pedido = new PedidoDTO();

		pedido.setIDVenda("" + venda.getVenda().getId());
		pedido.setNome(venda.getVenda().getCliente().getNome());
		pedido.setTelefone(venda.getVenda().getCliente().getTelefone());
		pedido.setPedido(pedidosToString(venda.getItems()));
		pedido.setObs(venda.getVenda().getObs());
		pedido.setData(venda.getVenda().getData());
		pedido.setTotal("" + venda.getTotal());
		pedido.setTroco("Troco");

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
