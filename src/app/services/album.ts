import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private albuns: Album[] = [
    // ===== POP =====
    {
      id: 1,
      nome: 'Thriller',
      artista: 'Michael Jackson',
      ano: 1982,
      genero: 'Pop',
      preco: 119.99,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png',
      descricao: 'O álbum mais vendido de todos os tempos. Lançado em 1982, Thriller consolidou Michael Jackson como o Rei do Pop.',
      faixas: ['Wanna Be Startin\' Somethin\'', 'Baby Be Mine', 'The Girl Is Mine', 'Thriller', 'Beat It', 'Billie Jean', 'Human Nature', 'P.Y.T.', 'The Lady in My Life']
    },
    // ===== ROCK/METAL =====
    {
      id: 2,
      nome: 'Master of Puppets',
      artista: 'Metallica',
      ano: 1986,
      genero: 'Rock/Metal',
      preco: 149.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Considerado um dos melhores álbuns de heavy metal de todos os tempos. Obra-prima do thrash metal.',
      faixas: ['Battery', 'Master of Puppets', 'The Thing That Should Not Be', 'Welcome Home (Sanitarium)', 'Disposable Heroes', 'Leper Messiah', 'Orion', 'Damage, Inc.']
    },
    {
      id: 3,
      nome: 'Appetite for Destruction',
      artista: 'Guns N\' Roses',
      ano: 1987,
      genero: 'Rock/Metal',
      preco: 144.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'O álbum de estreia do Guns N\' Roses, um dos maiores sucessos do rock. Trouxe de volta o som pesado e rebelde.',
      faixas: ['Welcome to the Jungle', 'It\'s So Easy', 'Nightrain', 'Out ta Get Me', 'Mr. Brownstone', 'Paradise City', 'My Michelle', 'Think About You', 'Sweet Child O\' Mine', 'You\'re Crazy', 'Anything Goes', 'Rocket Queen']
    },
    // ===== INDIE/ALTERNATIVO =====
    {
      id: 4,
      nome: 'In Rainbows',
      artista: 'Radiohead',
      ano: 2007,
      genero: 'Indie/Alternativo',
      preco: 154.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum experimental que mistura rock alternativo, eletrônica e música clássica. Uma obra-prima do indie.',
      faixas: ['15 Step', 'Bodysnatchers', 'Nude', 'Weird Fishes/Arpeggi', 'All I Need', 'Faust Arp', 'Reckoner', 'House of Cards', 'Jigsaw Falling into Place', 'Videotape']
    },
    {
      id: 5,
      nome: 'Is This It',
      artista: 'The Strokes',
      ano: 2001,
      genero: 'Indie/Alternativo',
      preco: 239.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/09/The_Strokes_-_Is_This_It_cover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum que revitalizou o rock no início dos anos 2000. Influenciou toda uma geração de bandas indie.',
      faixas: ['Is This It', 'The Modern Age', 'Soma', 'Barely Legal', 'Someday', 'Alone, Together', 'Last Nite', 'Hard to Explain', 'New York City Cops', 'Trying Your Luck', 'Take It or Leave It']
    },
    // ===== R&B =====
    {
      id: 6,
      nome: 'Songs in A Minor',
      artista: 'Alicia Keys',
      ano: 2001,
      genero: 'R&B',
      preco: 144.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/5/59/Songs_in_A_Minor.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original',
      descricao: 'Álbum de estreia de Alicia Keys, que mistura R&B, soul e jazz. Vencedor de 5 Grammys.',
      faixas: ['Piano & I', 'Girlfriend', 'How Come You Don\'t Call Me', 'Fallin\'', 'Troubles', 'Rock wit U', 'A Woman\'s Worth', 'Jane Doe', 'Goodbye', 'The Life', 'Mr. Man', 'Never Felt This Way', 'Butterflyz', 'Why Do I Feel So Sad', 'Caged Bird']
    },
    {
      id: 7,
      nome: 'Confessions',
      artista: 'Usher',
      ano: 2004,
      genero: 'R&B',
      preco: 149.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Usher_-_Confessions_album_cover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Um dos álbuns de R&B mais vendidos de todos os tempos. Conhecido por suas letras pessoais e produção impecável.',
      faixas: ['Yeah!', 'Throwback', 'Confessions Part I', 'Confessions Part II', 'Burn', 'Caught Up', 'Superstar', 'Truth Hurts', 'Simple Things', 'Bad Girl', 'That\'s What It\'s Made For', 'Can U Handle It?', 'Do It to Me', 'My Boo']
    },
    // ===== MPB =====
    {
      id: 8,
      nome: 'Caetano Veloso',
      artista: 'Caetano Veloso',
      ano: 1968,
      genero: 'MPB',
      preco: 99.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/05/Caetano_Veloso_1968.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum fundamental do movimento tropicalista. Caetano Veloso mistura bossa nova, rock e tradições brasileiras.',
      faixas: ['Tropicália', 'Clarice', 'No Dia em que Eu Vim-Me Embora', 'Alegria, Alegria', 'Soy Loco por Ti, América', 'Onde Andarás', 'Anunciação', 'Superbacana', 'Paisagem Útil', 'Clara', 'Ave-Maria', 'Eles']
    },
    {
      id: 9,
      nome: 'Clube da Esquina',
      artista: 'Clube da Esquina',
      ano: 1972,
      genero: 'MPB',
      preco: 94.99,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/7/74/Clubedaesquinacover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum coletivo que revolucionou a música brasileira. Mistura de bossa nova, folk e músicas populares.',
      faixas: ['Tudo Que Você Podia Ser', 'O Trem Azul', 'Nuvem Cigana', 'Lôro', 'O Cantador', 'Meu Voo', 'Paisagem da Janela', 'Cais', 'Um Gosto de Sol', 'Clube da Esquina', 'Saídas e Bandeiras']
    },
    // ===== RAP =====
    {
      id: 10,
      nome: 'Sobrevivendo no Inferno',
      artista: 'Racionais MC\'s',
      ano: 1997,
      genero: 'Rap',
      preco: 69.99,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/3/36/Sobrevivendo_no_Inferno.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'O álbum mais importante do rap brasileiro. Relato profundo sobre a realidade das periferias de São Paulo.',
      faixas: ['Jorge da Capadócia', 'Fórmula Mágica da Paz', 'Tô Ouvindo Alguém Me Chamar', 'Vida Loka I', 'Vida Loka II', 'A Fórmula da Paz', 'Negro Drama']
    },
    {
      id: 11,
      nome: 'The Marshall Mathers LP',
      artista: 'Eminem',
      ano: 2000,
      genero: 'Rap',
      preco: 249.99,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum que consolidou Eminem como um dos maiores rappers de todos os tempos. Letras polêmicas e pessoais.',
      faixas: ['Public Service Announcement', 'Kill You', 'Stan', 'Paul (Skit)', 'Who Knew', 'Steve Berman (Skit)', 'The Way I Am', 'The Real Slim Shady', 'Remember Me?', 'I\'m Back', 'Marshall Mathers', 'Ken Kaniff (Skit)', 'Drug Ballad', 'Amityville', 'Bitch Please II', 'Kim', 'Under the Influence', 'Criminal']
    },
    // ===== K-POP =====
{
  id: 12,
  nome: 'The Album',
  artista: 'BLACKPINK',
  ano: 2020,
  genero: 'K-Pop',
  preco: 349.99,
  imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/BLACKPINK-_The_Album.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
  descricao: 'Álbum de estreia do BLACKPINK, um dos maiores sucessos do K-Pop mundial.',
  faixas: ['How You Like That', 'Ice Cream', 'Pretty Savage', 'Lovesick Girls', 'Crazy Over You', 'Love To Hate Me', 'You Never Know']
},
{
  id: 13,
  nome: 'Map of the Soul: 7',
  artista: 'BTS',
  ano: 2020,
  genero: 'K-Pop',
  preco: 159.99,
  imagem: 'https://upload.wikimedia.org/wikipedia/en/2/21/BTS_-_Map_of_the_Soul_7.png?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=original',
  descricao: 'Álbum que consolidou o BTS como o maior grupo de K-Pop do mundo.',
  faixas: ['Boy With Luv', 'Black Swan', 'ON', 'Filter', 'My Time', 'Inner Child', 'Friends', 'Moon', 'Respect', 'We Are Bulletproof: the Eternal', 'Outro: Ego']
},

  ];

  getAlbuns(): Observable<Album[]> {
    return of(this.albuns);
  }

  getAlbum(id: number): Observable<Album | undefined> {
    const album = this.albuns.find(a => a.id === id);
    return of(album);
  }

  buscarAlbuns(termo: string): Observable<Album[]> {
    const resultados = this.albuns.filter(album => 
      album.nome.toLowerCase().includes(termo.toLowerCase()) ||
      album.artista.toLowerCase().includes(termo.toLowerCase()) ||
      album.genero.toLowerCase().includes(termo.toLowerCase())
    );
    return of(resultados);
  }
}
