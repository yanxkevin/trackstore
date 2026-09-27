import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Album } from '../../models/album.model';
import { CestaService } from '../../services/cesta';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css']
})
export class CestaComponent implements OnInit {
  itens: Album[] = [];
  total: number = 0;

  constructor(
    private cestaService: CestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCesta();
  }

  carregarCesta(): void {
    this.itens = this.cestaService.getItens();
    this.total = this.cestaService.getTotal();
  }

  aumentar(id: number): void {
    this.cestaService.aumentarQuantidade(id);
    this.carregarCesta();
  }

  diminuir(id: number): void {
    this.cestaService.diminuirQuantidade(id);
    this.carregarCesta();
  }

  remover(id: number): void {
    if (confirm('Deseja remover este álbum da cesta?')) {
      this.cestaService.remover(id);
      this.carregarCesta();
    }
  }

  limparCesta(): void {
    if (confirm('Deseja limpar toda a cesta?')) {
      this.cestaService.limpar();
      this.carregarCesta();
    }
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Sua cesta está vazia!');
      return;
    }

    alert(` Compra finalizada!\n\nTotal: R$ ${this.total.toFixed(2)}\n\nObrigado pela preferência!`);
    this.cestaService.limpar();
    this.carregarCesta();
    this.router.navigate(['/']);
  }

  irParaVitrine(): void {
    this.router.navigate(['/']);
  }

  getSubtotal(item: Album): number {
    return this.cestaService.getSubtotal(item);
  }

  // ========== MÉTODO QUE FALTAVA! ==========
  getQuantidadeTotal(): number {
    return this.cestaService.getQuantidadeTotal();
  }

  getCorGenero(genero: string): string {
    const cores: { [key: string]: string } = {
      'Pop': '#ef007b',
      'Rock/Metal': '#4ecdc4',
      'Indie/Alternativo': '#a29bfe',
      'R&B': '#1318c2',
      'MPB': '#5ce7ad',
      'Rap': '#1c1919',
      'K-Pop': '#1a8ec8'
    };
    return cores[genero] || '#6c757d';
  }
}