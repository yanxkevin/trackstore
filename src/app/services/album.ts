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
    {
      id: 15,
      nome: '1989',
      artista: 'Taylor Swift',
      ano: 2014,
      genero: 'Pop',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png',
      descricao: 'Álbum que marcou a transição de Taylor Swift para o pop. Vencedor do Grammy de Álbum do Ano.',
      faixas: ['Welcome to New York', 'Blank Space', 'Style', 'Out of the Woods', 'All You Had to Do Was Stay', 'Shake It Off', 'I Wish You Would', 'Bad Blood', 'Wildest Dreams', 'How You Get the Girl', 'This Love', 'I Know Places', 'Clean']
    },
    {
      id: 16,
      nome: 'Future Nostalgia',
      artista: 'Dua Lipa',
      ano: 2020,
      genero: 'Pop',
      preco: 109.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png',
      descricao: 'Álbum que consolidou Dua Lipa como uma das maiores estrelas do pop atual. Cheio de hits dançantes.',
      faixas: ['Future Nostalgia', 'Don\'t Start Now', 'Cool', 'Physical', 'Levitating', 'Pretty Please', 'Hallucinate', 'Love Again', 'Break My Heart', 'Good in Bed', 'Boys Will Be Boys']
    },
    {
      id: 17,
      nome: 'Teenage Dream',
      artista: 'Katy Perry',
      ano: 2010,
      genero: 'Pop',
      preco: 99.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Katy_Perry_-_Teenage_Dream_%28album%29.png',
      descricao: 'Um dos álbuns pop mais icônicos dos anos 2010, com 5 singles número 1 nos EUA.',
      faixas: ['Teenage Dream', 'Last Friday Night (T.G.I.F.)', 'California Gurls', 'Firework', 'Peacock', 'Circle the Drain', 'The One That Got Away', 'E.T.', 'Who Am I Living For?', 'Pearl', 'Hummingbird Heartbeat', 'Not Like the Movies']
    },
    {
      id: 30,
      nome: 'Short n\' Sweet',
      artista: 'Sabrina Carpenter',
      ano: 2024,
      genero: 'Pop',
      preco: 89.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum que consolidou Sabrina Carpenter como uma das maiores estrelas do pop atual. Cheio de hits como "Espresso" e "Please Please Please".',
      faixas: ['Taste', 'Please Please Please', 'Good Graces', 'Sharpest Tool', 'Coincidence', 'Bed Chem', 'Espresso', 'Dumb & Poetic', 'Slim Pickins', 'Juno', 'Lie to Girls', 'Don\'t Smile']
    },
    {
      id: 31,
      nome: 'Born This Way',
      artista: 'Lady Gaga',
      ano: 2011,
      genero: 'Pop',
      preco: 139.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/c/c3/Born_This_Way_album_cover.png',
      descricao: 'Álbum que celebra a individualidade e a diversidade. Trouxe hits como "Born This Way" e "The Edge of Glory".',
      faixas: ['Marry the Night', 'Born This Way', 'Government Hooker', 'Judas', 'Americano', 'Hair', 'Scheiße', 'Bloody Mary', 'Black Jesus + Amen Fashion', 'Bad Kids', 'Fashion of His Love', 'Highway Unicorn (Road to Love)', 'Heavy Metal Lover', 'Electric Chapel', 'The Queen', 'You and I', 'The Edge of Glory']
    },

    // ===== ROCK/METAL =====
    {
      id: 2,
      nome: 'Master of Puppets',
      artista: 'Metallica',
      ano: 1986,
      genero: 'Rock/Metal',
      preco: 149.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Metallica_-_Master_of_Puppets_cover.jpg',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/6/60/GunsnRosesAppetiteforDestructionalbumcover.jpg',
      descricao: 'O álbum de estreia do Guns N\' Roses, um dos maiores sucessos do rock. Trouxe de volta o som pesado e rebelde.',
      faixas: ['Welcome to the Jungle', 'It\'s So Easy', 'Nightrain', 'Out ta Get Me', 'Mr. Brownstone', 'Paradise City', 'My Michelle', 'Think About You', 'Sweet Child O\' Mine', 'You\'re Crazy', 'Anything Goes', 'Rocket Queen']
    },
    {
      id: 18,
      nome: 'Back in Black',
      artista: 'AC/DC',
      ano: 1980,
      genero: 'Rock/Metal',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/ACDC_Back_in_Black.png/500px-ACDC_Back_in_Black.png',
      descricao: 'Um dos álbuns mais vendidos da história do rock. A volta triunfal do AC/DC após a morte de Bon Scott.',
      faixas: ['Hells Bells', 'Shoot to Thrill', 'What Do You Do for Money Honey', 'Given the Dog a Bone', 'Let Me Put My Love into You', 'Back in Black', 'You Shook Me All Night Long', 'Have a Drink on Me', 'Shake a Leg', 'Rock and Roll Ain\'t Noise Pollution']
    },
    {
      id: 19,
      nome: 'Nevermind',
      artista: 'Nirvana',
      ano: 1991,
      genero: 'Rock/Metal',
      preco: 139.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg',
      descricao: 'O álbum que revolucionou o rock nos anos 90 e trouxe o grunge para o mainstream mundial.',
      faixas: ['Smells Like Teen Spirit', 'In Bloom', 'Come as You Are', 'Breed', 'Lithium', 'Polly', 'Territorial Pissings', 'Drain You', 'Lounge Act', 'Stay Away', 'On a Plain', 'Something in the Way']
    },
    {
      id: 32,
      nome: 'The Dark Side of the Moon',
      artista: 'Pink Floyd',
      ano: 1973,
      genero: 'Rock/Metal',
      preco: 159.90,
      imagem: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3b/Dark_Side_of_the_Moon.png/500px-Dark_Side_of_the_Moon.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
      descricao: 'Um dos álbuns mais influentes da história do rock. Conhecido por suas letras filosóficas e experimentações sonoras.',
      faixas: ['Speak to Me', 'Breathe', 'On the Run', 'Time', 'The Great Gig in the Sky', 'Money', 'Us and Them', 'Any Colour You Like', 'Brain Damage', 'Eclipse']
    },
    {
      id: 33,
      nome: 'The Black Parade',
      artista: 'My Chemical Romance',
      ano: 2006,
      genero: 'Rock/Metal',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Blackparadecover.jpg',
      descricao: 'Álbum conceitual que conta a história de um paciente terminal. Um dos maiores sucessos do rock dos anos 2000.',
      faixas: ['The End.', 'Dead!', 'This Is How I Disappear', 'The Sharpest Lives', 'Welcome to the Black Parade', 'I Don\'t Love You', 'House of Wolves', 'Cancer', 'Mama', 'Sleep', 'Teenagers', 'Disenchanted', 'Famous Last Words', 'Blood']
    },

    // ===== INDIE/ALTERNATIVO =====
    {
      id: 4,
      nome: 'In Rainbows',
      artista: 'Radiohead',
      ano: 2007,
      genero: 'Indie/Alternativo',
      preco: 154.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/09/The_Strokes_-_Is_This_It_cover.png',
      descricao: 'Álbum que revitalizou o rock no início dos anos 2000. Influenciou toda uma geração de bandas indie.',
      faixas: ['Is This It', 'The Modern Age', 'Soma', 'Barely Legal', 'Someday', 'Alone, Together', 'Last Nite', 'Hard to Explain', 'New York City Cops', 'Trying Your Luck', 'Take It or Leave It']
    },
    {
      id: 20,
      nome: 'AM',
      artista: 'Arctic Monkeys',
      ano: 2013,
      genero: 'Indie/Alternativo',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/04/Arctic_Monkeys_-_AM.png',
      descricao: 'Álbum que consolidou o Arctic Monkeys como uma das maiores bandas indie da atualidade. Cheio de hits.',
      faixas: ['Do I Wanna Know?', 'R U Mine?', 'One for the Road', 'Arabella', 'I Want It All', 'No. 1 Party Anthem', 'Mad Sounds', 'Fireside', 'Why\'d You Only Call Me When You\'re High?', 'Snap Out of It', 'Knee Socks', 'I Wanna Be Yours']
    },
    {
      id: 21,
      nome: 'Blurryface',
      artista: 'Twenty One Pilots',
      ano: 2015,
      genero: 'Indie/Alternativo',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Blurryface_by_Twenty_One_Pilots.png',
      descricao: 'Álbum que mistura indie, alternativo, rap e eletrônica. Trouxe hits como "Stressed Out" e "Ride".',
      faixas: ['Heavydirtysoul', 'Stressed Out', 'Ride', 'Fairly Local', 'Tear in My Heart', 'Lane Boy', 'The Judge', 'Doubt', 'Message Man', 'Polarize', 'We Don\'t Believe What\'s on TV', 'Not Today', 'Goner']
    },
    {
      id: 34,
      nome: 'The 1975',
      artista: 'The 1975',
      ano: 2013,
      genero: 'Indie/Alternativo',
      preco: 109.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/03/The_1975_%28album%29_by_The_1975.png',
      descricao: 'Álbum de estreia da banda The 1975, que mistura indie rock, pop e eletrônica.',
      faixas: ['The 1975', 'The City', 'M.O.N.E.Y.', 'Chocolate', 'Sex', 'Talk!', 'An Encounter', 'Heart Out', 'Settle Down', 'Robbers', 'Girls', '12', 'She Way Out', 'Menswear', 'Pressure', 'Is There Somebody Who Can Watch You']
    },
    {
      id: 35,
      nome: 'Fetch the Bolt Cutters',
      artista: 'Fiona Apple',
      ano: 2020,
      genero: 'Indie/Alternativo',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/00/Fiona_Apple_-_Fetch_the_Bolt_Cutters.png',
      descricao: 'Álbum aclamado pela crítica que mistura indie, art pop e experimental. Vencedor de 2 Grammys.',
      faixas: ['I Want You to Love Me', 'Shameika', 'Fetch the Bolt Cutters', 'Under the Table', 'Relay', 'Rack of His', 'Newspaper', 'Ladies', 'Heavy Balloon', 'Cosmonauts', 'For Her', 'Drumset', 'On I Go']
    },

    // ===== R&B =====
    {
      id: 6,
      nome: 'Songs in A Minor',
      artista: 'Alicia Keys',
      ano: 2001,
      genero: 'R&B',
      preco: 144.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/5/59/Songs_in_A_Minor.png',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f7/Usher_-_Confessions_album_cover.png',
      descricao: 'Um dos álbuns de R&B mais vendidos de todos os tempos. Conhecido por suas letras pessoais e produção impecável.',
      faixas: ['Yeah!', 'Throwback', 'Confessions Part I', 'Confessions Part II', 'Burn', 'Caught Up', 'Superstar', 'Truth Hurts', 'Simple Things', 'Bad Girl', 'That\'s What It\'s Made For', 'Can U Handle It?', 'Do It to Me', 'My Boo']
    },
    {
      id: 22,
      nome: 'Lemonade',
      artista: 'Beyoncé',
      ano: 2016,
      genero: 'R&B',
      preco: 159.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png',
      descricao: 'Álbum visual que mistura R&B, soul, hip-hop e rock. Uma obra-prima da Beyoncé.',
      faixas: ['Pray You Catch Me', 'Hold Up', 'Don\'t Hurt Yourself', 'Sorry', '6 Inch', 'Daddy Lessons', 'Love Drought', 'Sandcastles', 'Forward', 'Freedom', 'All Night', 'Formation']
    },
    {
      id: 23,
      nome: 'After Hours',
      artista: 'The Weeknd',
      ano: 2020,
      genero: 'R&B',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png',
      descricao: 'Álbum que trouxe o hit mundial "Blinding Lights". Uma mistura de R&B, synthpop e new wave.',
      faixas: ['Alone Again', 'Too Late', 'Hardest to Love', 'Scared to Live', 'Snowchild', 'Escape from LA', 'Heartless', 'Faith', 'Blinding Lights', 'In Your Eyes', 'Save Your Tears', 'Repeat After Me', 'After Hours', 'Until I Bleed Out']
    },
    {
      id: 36,
      nome: 'CTRL',
      artista: 'SZA',
      ano: 2017,
      genero: 'R&B',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/b/bf/SZA_-_Ctrl_cover.png',
      descricao: 'Álbum de estreia de SZA, aclamado pela crítica. Mistura R&B, neo soul e indie. Indicado ao Grammy de Melhor Álbum Urbano Contemporâneo.',
      faixas: ['Supermodel', 'Love Galore', 'Doves in the Wind', 'Drew Barrymore', 'Prom', 'The Weekend', 'Go Gina', 'Garden (Say It Like Dat)', 'Broken Clocks', 'Anything', 'Wavy (Interlude)', 'Normal Girl', 'Pretty Little Birds', '20 Something']
    },
    {
  id: 37,
  nome: 'Play With The Changes',
  artista: 'Rochelle Jordan',
  ano: 2021,
  genero: 'R&B',
  preco: 119.90,
  imagem: 'https://upload.wikimedia.org/wikipedia/en/5/53/Rochelle_Jordan_-_Play_With_The_Changes.jpeg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
  descricao: 'Álbum que funde R&B futurista com UK garage, house e batidas quebradas. Uma obra que mistura nostalgia dos anos 90 com produção eletrônica moderna.',
  faixas: ['Love U Good', 'Got Em', 'Next 2 You', 'All Along', 'Broken Steel', 'Count It', 'Already', 'Nothing Left', 'Lay', 'Something', 'Dancing Elephants', 'Situation']
},

    // ===== MPB =====
    {
      id: 8,
      nome: 'Caetano Veloso',
      artista: 'Caetano Veloso',
      ano: 1968,
      genero: 'MPB',
      preco: 99.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/05/Caetano_Veloso_1968.jpg',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/7/74/Clubedaesquinacover.png',
      descricao: 'Álbum coletivo que revolucionou a música brasileira. Mistura de bossa nova, folk e músicas populares.',
      faixas: ['Tudo Que Você Podia Ser', 'O Trem Azul', 'Nuvem Cigana', 'Lôro', 'O Cantador', 'Meu Voo', 'Paisagem da Janela', 'Cais', 'Um Gosto de Sol', 'Clube da Esquina', 'Saídas e Bandeiras']
    },
    {
      id: 24,
      nome: 'Tribalistas',
      artista: 'Tribalistas',
      ano: 2017,
      genero: 'MPB',
      preco: 109.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Tribalistas_2017_cover.jpg',
      descricao: 'Obra MPB contemporânea que reúne Arnaldo Antunes, Carlinhos Brown e Marisa Monte.',
      faixas: ['Diáspora', 'Um Só', 'Fora de Memória', 'Falando de Amor', 'Aliança', 'Trabalivre', 'Bailão do Mundo', 'Ânima', 'Feliz e Saudável', 'Lutar e Vencer', 'Os Peixinhos']
    },
    {
      id: 25,
      nome: 'Elis & Tom',
      artista: 'Elis Regina & Tom Jobim',
      ano: 1974,
      genero: 'MPB',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/6/64/Elistom.jpg',
      descricao: 'Um dos maiores álbuns da MPB, unindo a voz de Elis Regina e as composições de Tom Jobim.',
      faixas: ['Águas de Março', 'Pois É', 'Só Tinha de Ser com Você', 'Modinha', 'Triste', 'Corcovado', 'O Que Tinha de Ser', 'Retrato em Branco e Preto', 'Brigas, Nunca Mais', 'Por Toda a Minha Vida', 'Fotografia', 'Soneto de Separação', 'Chovendo na Roseira', 'Inútil Paisagem']
    },
    {
      id: 38,
      nome: 'Construção',
      artista: 'Chico Buarque',
      ano: 1971,
      genero: 'MPB',
      preco: 109.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Constru%C3%A7%C3%A3o_album_cover.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Uma das obras mais importantes da MPB. Chico Buarque retrata a vida do trabalhador brasileiro.',
      faixas: ['Deus lhe Pague', 'Cotidiano', 'Desalento', 'Construção', 'Cordão', 'Olha Maria', 'Samba de Orly', 'Valsinha', 'Minha História', 'Acalanto']
    },
    {
  id: 39,
  nome: 'Ventura',
  artista: 'Los Hermanos',
  ano: 2003,
  genero: 'MPB',
  preco: 99.90,
  imagem: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Ventura_Los_Hermanos.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
  descricao: 'Terceiro álbum do Los Hermanos, considerado um marco da música brasileira dos anos 2000. Mistura MPB, rock alternativo e samba com letras poéticas.',
  faixas: ['Samba a Dois', 'O Vencedor', 'Tá Bom', 'Último Romance', 'Do Sétimo Andar', 'A Outra', 'Cara Estranho', 'O Velho e o Moço', 'Além do Que Se Vê', 'Dois de Fevereiro', 'Deixa o Verão', 'De Onde Vem a Calma']
},

    // ===== RAP =====
    {
      id: 10,
      nome: 'Sobrevivendo no Inferno',
      artista: 'Racionais MC\'s',
      ano: 1997,
      genero: 'Rap',
      preco: 89.99,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/3/36/Sobrevivendo_no_Inferno.jpg',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg',
      descricao: 'Álbum que consolidou Eminem como um dos maiores rappers de todos os tempos. Letras polêmicas e pessoais.',
      faixas: ['Public Service Announcement', 'Kill You', 'Stan', 'Paul (Skit)', 'Who Knew', 'Steve Berman (Skit)', 'The Way I Am', 'The Real Slim Shady', 'Remember Me?', 'I\'m Back', 'Marshall Mathers', 'Ken Kaniff (Skit)', 'Drug Ballad', 'Amityville', 'Bitch Please II', 'Kim', 'Under the Influence', 'Criminal']
    },
    {
      id: 26,
      nome: 'To Pimp a Butterfly',
      artista: 'Kendrick Lamar',
      ano: 2015,
      genero: 'Rap',
      preco: 139.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png',
      descricao: 'Álbum aclamado pela crítica que mistura rap, jazz, funk e soul. Vencedor de 5 Grammys.',
      faixas: ['Wesley\'s Theory', 'For Free? (Interlude)', 'King Kunta', 'Institutionalized', 'These Walls', 'u', 'Alright', 'For Sale? (Interlude)', 'Momma', 'Hood Politics', 'How Much a Dollar Cost', 'Complexion (A Zulu Love)', 'The Blacker the Berry', 'You Ain\'t Gotta Lie (Momma Said)', 'i', 'Mortal Man']
    },
    {
      id: 27,
      nome: 'Stankonia',
      artista: 'Outkast',
      ano: 2000,
      genero: 'Rap',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/0b/OutKast_-_Stankonia.JPG',
      descricao: 'Consagração do Rap do Sul. Outkast mistura rap, funk e soul em um dos álbuns mais aclamados dos anos 2000.',
      faixas: ['Intro', 'Gasoline Dreams', 'I\'m Cool (Interlude)', 'So Fresh, So Clean', 'Ms. Jackson', 'Snappin\' & Trappin\'', 'D.F. (Interlude)', 'Spaghetti Junction', 'Kim & Cookie (Interlude)', 'I\'ll Call Before I Come', 'B.O.B.', 'Xplosion', 'Good Hair (Interlude)', 'We Luv Deez Hoez', 'Humble Mumble', 'Drinkin\' Again (Interlude)', '?', 'Red Velvet', 'Cruisin\' in the ATL (Interlude)', 'Gangsta Shit', 'Toilet Tisha', 'Slum Beautiful', 'Pre-Nump (Interlude)', 'Stankonia (Stanklove)']
    },
    {
      id: 40,
      nome: 'Wolf',
      artista: 'Tyler, the Creator',
      ano: 2013,
      genero: 'Rap',
      preco: 139.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/fd/Wolf_Cover2.jpg',
      descricao: 'Álbum que consolidou Tyler, the Creator como um dos artistas mais criativos do rap. Produção própria e letras introspectivas.',
      faixas: ['Wolf', 'Jamba', 'Cowboy', 'Awkward', 'Domo23', 'Answer', 'Slater', '48', 'Colossus', 'PartyIsntOver/Campfire/Bimmer', 'IFHY', 'Pigs', 'Parking Lot', 'Treehome95', 'Tamale', 'Lone']
    },
    {
      id: 41,
      nome: 'good kid, m.A.A.d city',
      artista: 'Kendrick Lamar',
      ano: 2012,
      genero: 'Rap',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/9/93/KendrickGKMC.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Álbum de estreia de Kendrick Lamar. Aclamado pela crítica e indicado ao Grammy.',
      faixas: ['Sherane a.k.a Master Splinter\'s Daughter', 'Bitch, Don\'t Kill My Vibe', 'Backseat Freestyle', 'The Art of Peer Pressure', 'Money Trees', 'Poetic Justice', 'good kid', 'm.A.A.d city', 'Swimming Pools (Drank)', 'Sing About Me, I\'m Dying of Thirst', 'Real', 'Compton']
    },

    // ===== K-POP =====
    {
      id: 12,
      nome: 'The Album',
      artista: 'BLACKPINK',
      ano: 2020,
      genero: 'K-Pop',
      preco: 199.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f2/BLACKPINK-_The_Album.png',
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
      imagem: 'https://upload.wikimedia.org/wikipedia/en/2/21/BTS_-_Map_of_the_Soul_7.png',
      descricao: 'Álbum que consolidou o BTS como o maior grupo de K-Pop do mundo.',
      faixas: ['Boy With Luv', 'Black Swan', 'ON', 'Filter', 'My Time', 'Inner Child', 'Friends', 'Moon', 'Respect', 'We Are Bulletproof: the Eternal', 'Outro: Ego']
    },
    {
      id: 28,
      nome: 'Formula of Love: O+T=<3',
      artista: 'TWICE',
      ano: 2021,
      genero: 'K-Pop',
      preco: 129.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/8/8e/Twice_-_Formula_of_Love.png',
      descricao: 'Álbum do TWICE que trouxe o hit "Scientist". Um dos grupos mais populares do K-Pop.',
      faixas: ['Scientist', 'Moonlight', 'Icon', 'Cruel', 'Real You', 'F.I.L.A (Fall in Love Again)', 'Last Waltz', 'Espresso', 'Rewind', 'Cactus', 'Push & Pull', 'Hello', '1, 3, 2', 'Candy', 'The Feels']
    },
    {
      id: 29,
      nome: 'Sticker',
      artista: 'NCT 127',
      ano: 2021,
      genero: 'K-Pop',
      preco: 119.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/1/12/NCT_127_-_Sticker.png',
      descricao: 'Álbum do NCT 127 que mistura K-Pop com hip-hop e R&B. Conhecido pelo som experimental.',
      faixas: ['Sticker', 'Lemonade', 'Breakfast', 'Focus', 'The Rainy Night', 'Far', 'Bring the Noize', 'Magic Carpet Ride', 'Road Trip', 'Dreamer', 'Promise You']
    },
    {
      id: 42,
      nome: 'The Red',
      artista: 'Red Velvet',
      ano: 2015,
      genero: 'K-Pop',
      preco: 149.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/0/00/The_Red_album_by_Red_Velvet.jpg',
      descricao: 'Álbum do Red Velvet que mistura K-Pop, pop e R&B. Primeiro álbum número 1 do grupo na Coreia.',
      faixas: ['Dumb Dumb', 'Huff n Puff', 'Campfire', 'Red Dress', 'Oh Boy', 'Lady\'s Room', 'Time Slip', 'Don\'t U Wait No More', 'Day 1', 'Cool World']
    },
    {
      id: 43,
      nome: 'REBOOT',
      artista: 'Wonder Girls',
      ano: 2015,
      genero: 'K-Pop',
      preco: 179.90,
      imagem: 'https://upload.wikimedia.org/wikipedia/en/2/23/Wonder_Girls_-_Reboot.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled',
      descricao: 'Um dos maiores sucessos do K-Pop mundial.',
      faixas: ['Baby Don\'t Stop', 'I Feel You', 'Rewind', 'Loved', 'John Doe', 'One Black Night', 'You Never Know', 'Back', 'OPPA', 'Faded Love', 'GONE', 'Remember']
    }
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