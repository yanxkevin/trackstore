import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  // Observable para o contador de itens no header
  private contadorItens = new BehaviorSubject<number>(0);
  contadorItens$ = this.contadorItens.asObservable();

  constructor() {
    this.atualizarContador();
  }

  // ========== PEGAR A CHAVE DA CESTA DO USUÁRIO LOGADO ==========
  private getChaveCesta(): string | null {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return null;

    const usuario = JSON.parse(usuarioLogado);
    return `cesta_${usuario.email}`;
  }

  // ========== PEGAR TODOS OS ITENS DA CESTA ==========
  getItens(): Album[] {
    const chave = this.getChaveCesta();
    if (!chave) return [];

    const cesta = localStorage.getItem(chave);
    return cesta ? JSON.parse(cesta) : [];
  }

  // ========== ADICIONAR ITEM (OU AUMENTAR QUANTIDADE) ==========
  adicionar(album: Album): { sucesso: boolean; mensagem: string } {
    const chave = this.getChaveCesta();
    if (!chave) {
      return { sucesso: false, mensagem: 'Você precisa estar logado!' };
    }

    const itens = this.getItens();
    const itemExistente = itens.find(i => i.id === album.id);

    if (itemExistente) {
      // Já existe → aumenta a quantidade
      itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
    } else {
      // Não existe → adiciona com quantidade 1
      itens.push({ ...album, quantidade: 1 });
    }

    localStorage.setItem(chave, JSON.stringify(itens));
    this.atualizarContador();

    return {
      sucesso: true,
      mensagem: `${album.nome} adicionado à cesta!`
    };
  }

  // ========== AUMENTAR QUANTIDADE ==========
  aumentarQuantidade(id: number): void {
    const chave = this.getChaveCesta();
    if (!chave) return;

    const itens = this.getItens();
    const item = itens.find(i => i.id === id);

    if (item) {
      item.quantidade = (item.quantidade || 1) + 1;
      localStorage.setItem(chave, JSON.stringify(itens));
      this.atualizarContador();
    }
  }

  // ========== DIMINUIR QUANTIDADE ==========
  diminuirQuantidade(id: number): void {
    const chave = this.getChaveCesta();
    if (!chave) return;

    const itens = this.getItens();
    const item = itens.find(i => i.id === id);

    if (item) {
      item.quantidade = (item.quantidade || 1) - 1;

      // Se quantidade = 0, remove o item
      if (item.quantidade <= 0) {
        const index = itens.findIndex(i => i.id === id);
        itens.splice(index, 1);
      }

      localStorage.setItem(chave, JSON.stringify(itens));
      this.atualizarContador();
    }
  }

  // ========== REMOVER ITEM ==========
  remover(id: number): void {
    const chave = this.getChaveCesta();
    if (!chave) return;

    const itens = this.getItens().filter(i => i.id !== id);
    localStorage.setItem(chave, JSON.stringify(itens));
    this.atualizarContador();
  }

  // ========== LIMPAR CESTA ==========
  limpar(): void {
    const chave = this.getChaveCesta();
    if (!chave) return;

    localStorage.removeItem(chave);
    this.atualizarContador();
  }

  // ========== CALCULAR TOTAL ==========
  getTotal(): number {
    const itens = this.getItens();
    return itens.reduce((total, item) => {
      return total + (item.preco * (item.quantidade || 1));
    }, 0);
  }

  // ========== CALCULAR SUBTOTAL DE UM ITEM ==========
  getSubtotal(item: Album): number {
    return item.preco * (item.quantidade || 1);
  }

  // ========== CONTAR TOTAL DE ITENS ==========
  getQuantidadeTotal(): number {
    const itens = this.getItens();
    return itens.reduce((total, item) => total + (item.quantidade || 1), 0);
  }

  // ========== ATUALIZAR CONTADOR DO HEADER ==========
  atualizarContador(): void {
    this.contadorItens.next(this.getQuantidadeTotal());
  }

  // ========== VERIFICAR SE ITEM JÁ ESTÁ NA CESTA ==========
  estaNaCesta(id: number): boolean {
    return this.getItens().some(i => i.id === id);
  }
}