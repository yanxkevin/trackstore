export interface Album {
  id: number;
  nome: string;
  artista: string;
  ano: number;
  genero: string;
  preco: number;
  imagem: string;
  descricao: string;
  faixas: string[];
  quantidade?: number;
}