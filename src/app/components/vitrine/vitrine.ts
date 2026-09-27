import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.model';
import { CestaService } from '../../services/cesta';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vitrine.html',
  styleUrls: ['./vitrine.css']
})
export class VitrineComponent implements OnInit {
  albuns: Album[] = [];

  // ========== MENSAGENS ==========
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  generos = [
    {
      nome: 'Pop',
      rota: 'pop',
      imagem: 'https://pbs.twimg.com/media/HSbyTzKWMAEbhWh?format=png&name=900x900',
      descricao: 'Os maiores hits da cultura pop'
    },
    {
      nome: 'Rock/Metal',
      rota: 'rock-metal',
      imagem: 'https://pbs.twimg.com/media/HQ3UjKHW0AA4wcI?format=png&name=900x900',
      descricao: 'O som pesado que revolucionou a música'
    },
    {
      nome: 'Indie/Alternativo',
      rota: 'indie-alternativo',
      imagem: 'https://pbs.twimg.com/media/HQ3aFfKW0AAOVLw?format=png&name=900x900',
      descricao: 'O mercado fora do mainstream'
    },
    {
      nome: 'R&B',
      rota: 'r-b',
      imagem: 'https://pbs.twimg.com/media/HQ3XA5mWkAALFja?format=png&name=900x900',
      descricao: 'A fusão de blues,  jazz, gospel e boogie-woogie '
    },
    {
      nome: 'MPB',
      rota: 'mpb',
      imagem: 'https://pbs.twimg.com/media/HQ3RSnmWAAAPhGs?format=png&name=900x900',
      descricao: 'A música popular brasileira'
    },
    {
      nome: 'Rap',
      rota: 'rap',
      imagem: 'https://pbs.twimg.com/media/HQ3N2opXkAA6AOn?format=png&name=900x900',
      descricao: 'A principal manifestação musical da cultura hipo-hop'
    },
    {
      nome: 'K-Pop',
      rota: 'k-pop',
      imagem: 'https://pbs.twimg.com/media/HRujKiPbcAAqz8H?format=png&name=900x900',
      descricao: 'O fenômeno da música pop coreana'
    }
  ];

  constructor(
    private albumService: AlbumService,
    private cestaService: CestaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbuns().subscribe(data => {
      this.albuns = data;
    });
  }

  contarAlbunsPorGenero(genero: string): number {
    if (!this.albuns || this.albuns.length === 0) {
      return 0;
    }
    return this.albuns.filter(album => album.genero === genero).length;
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
}