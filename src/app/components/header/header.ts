import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CestaService } from '../../services/cesta';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  usuarioLogado: any = null;
  contadorCesta: number = 0;

  constructor(
    private router: Router,
    private cestaService: CestaService
  ) {}

  ngOnInit(): void {
    this.verificarUsuario();

    // Escuta o contador da cesta em tempo real
    this.cestaService.contadorItens$.subscribe(contador => {
      this.contadorCesta = contador;
    });
  }

  verificarUsuario(): void {
    const usuario = localStorage.getItem('usuarioLogado');
    if (usuario) {
      this.usuarioLogado = JSON.parse(usuario);
      this.cestaService.atualizarContador();
    } else {
      this.usuarioLogado = null;
    }
  }

  fazerLogout(): void {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = null;
    this.cestaService.atualizarContador();
    this.router.navigate(['/']);
    window.location.reload();
  }
}