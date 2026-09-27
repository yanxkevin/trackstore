import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.model';
import { CestaService } from '../../services/cesta';

@Component({
  selector: 'app-genero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './genero.html',
  styleUrls: ['./genero.css']
})
export class GeneroComponent implements OnInit {
  genero: string = '';
  albuns: Album[] = [];
  fundoImagem: string = '';

  // ========== MENSAGENS ==========
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  // ========== IMAGENS DE FUNDO POR GÊNERO ==========
  fundos: { [key: string]: string } = {
    'pop': 'https://pbs.twimg.com/media/HQ74OsxWYAAf2BY?format=jpg&name=large',
    'rock-metal': 'https://pbs.twimg.com/media/HQ_ndW2X0AA39rx?format=jpg&name=large',
    'indie-alternativo': 'https://pbs.twimg.com/media/HRA9Q5iWMAAibCC?format=jpg&name=large',
    'r-b': 'https://pbs.twimg.com/media/HR3evmSXAAkxrrr?format=jpg&name=large',
    'mpb': 'https://i.pinimg.com/originals/55/45/d4/5545d4027a4fa45a86af2d3f41b07a40.jpg',
    'rap': 'https://i.pinimg.com/originals/8e/a4/3f/8ea43f95564a01aaed805e7ee47e3df1.jpg',
    'k-pop': 'https://pbs.twimg.com/media/HR3ocLjbAAAX6Pk?format=jpg&name=large'
  };

  // ========== CORES POR GÊNERO ==========
  cores: { [key: string]: string } = {
    'pop': '#ef007b',
    'rock-metal': '#4ecdc4',
    'indie-alternativo': '#a29bfe',
    'r-b': '#1318c2',
    'mpb': '#5ce7ad',
    'rap': '#1c1919',
    'k-pop': '#1a8ec8'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private cestaService: CestaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.genero = params['genero'];
      this.fundoImagem = this.fundos[this.genero] || '';
      this.carregarAlbuns();
    });
  }

  carregarAlbuns(): void {
    this.albumService.getAlbuns().subscribe(data => {
      const mapaGeneros: { [key: string]: string } = {
        'pop': 'Pop',
        'rock-metal': 'Rock/Metal',
        'indie-alternativo': 'Indie/Alternativo',
        'r-b': 'R&B',
        'mpb': 'MPB',
        'rap': 'Rap',
        'k-pop': 'K-Pop'
      };

      const generoNome = mapaGeneros[this.genero] || '';
      this.albuns = data.filter(album => album.genero === generoNome);
    });
  }

  voltar(): void {
    this.router.navigate(['/']);
  }

  // ========== ADICIONAR À CESTA COM MENSAGEM ==========
  adicionarCesta(album: Album): void {
    // Limpar mensagens anteriores
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

  getNomeGenero(): string {
    const mapa: { [key: string]: string } = {
      'pop': 'Pop',
      'rock-metal': 'Rock/Metal',
      'indie-alternativo': 'Indie/Alternativo',
      'r-b': 'R&B',
      'mpb': 'MPB',
      'rap': 'Rap',
      'k-pop': 'K-Pop'
    };
    return mapa[this.genero] || this.genero;
  }

  getCorGenero(): string {
    return this.cores[this.genero] || '#ffffff';
  }
}