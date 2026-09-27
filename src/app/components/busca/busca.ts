import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.model';
import { CestaService } from '../../services/cesta';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './busca.html',
  styleUrls: ['./busca.css']
})
export class BuscaComponent implements OnInit {
  termoBusca: string = '';
  sugestoes: string[] = [];
  resultados: Album[] = [];
  todosAlbuns: Album[] = [];
  buscou: boolean = false;
  mostrarSugestoes: boolean = false;

  // ========== MENSAGENS ==========
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(
    private albumService: AlbumService,
    private cestaService: CestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbuns().subscribe(data => {
      this.todosAlbuns = data;

      // Restaurar busca salva
      const buscaSalva = localStorage.getItem('buscaSalva');
      if (buscaSalva) {
        const estado = JSON.parse(buscaSalva);
        this.termoBusca = estado.termoBusca || '';

        if (this.termoBusca) {
          this.onBuscar();
        }
      }
    });
  }

  onBuscar(): void {
    this.buscou = true;
    this.mostrarSugestoes = false;

    if (!this.termoBusca || this.termoBusca.trim() === '') {
      this.resultados = [];
      localStorage.removeItem('buscaSalva');
      return;
    }

    const termo = this.termoBusca.toLowerCase().trim();

    this.resultados = this.todosAlbuns.filter(album =>
      album.nome.toLowerCase().includes(termo) ||
      album.artista.toLowerCase().includes(termo) ||
      album.genero.toLowerCase().includes(termo)
    );

    this.salvarBusca();
  }

  salvarBusca(): void {
    const estado = { termoBusca: this.termoBusca };
    localStorage.setItem('buscaSalva', JSON.stringify(estado));
  }

  onDigitar(): void {
    this.buscou = false;

    if (!this.termoBusca || this.termoBusca.trim() === '') {
      this.sugestoes = [];
      this.mostrarSugestoes = false;
      this.resultados = [];
      localStorage.removeItem('buscaSalva');
      return;
    }

    const termo = this.termoBusca.toLowerCase().trim();

    const sugestoesAlbuns = this.todosAlbuns
      .filter(album => album.nome.toLowerCase().includes(termo))
      .map(album => album.nome);

    const sugestoesArtistas = this.todosAlbuns
      .filter(album => album.artista.toLowerCase().includes(termo))
      .map(album => album.artista);

    const sugestoesGeneros = this.todosAlbuns
      .filter(album => album.genero.toLowerCase().includes(termo))
      .map(album => album.genero);

    const todasSugestoes = [...sugestoesAlbuns, ...sugestoesArtistas, ...sugestoesGeneros];
    this.sugestoes = [...new Set(todasSugestoes)].slice(0, 8);

    this.mostrarSugestoes = this.sugestoes.length > 0;
  }

  selecionarSugestao(sugestao: string): void {
    this.termoBusca = sugestao;
    this.mostrarSugestoes = false;
    this.onBuscar();
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.sugestoes = [];
    this.resultados = [];
    this.buscou = false;
    this.mostrarSugestoes = false;
    localStorage.removeItem('buscaSalva');
  }

  fecharSugestoes(): void {
    setTimeout(() => {
      this.mostrarSugestoes = false;
    }, 200);
  }

  // ========== ADICIONAR À CESTA COM MENSAGEM ==========
  adicionarCesta(album: Album): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
      this.mensagemErro = 'Você precisa estar logado para adicionar itens à cesta!';
      setTimeout(() => { this.mensagemErro = ''; }, 5000);
      return;
    }

    const resultado = this.cestaService.adicionar(album);
    this.mensagemSucesso = resultado.mensagem;
    setTimeout(() => { this.mensagemSucesso = ''; }, 3000);
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
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