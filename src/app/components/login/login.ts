import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm!: NgForm;

  email: string = '';
  senha: string = '';
  erroLogin: string = '';
  sucessoLogin: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('usuarioLogado')) {
      this.router.navigate(['/']);
    }
  }

  fazerLogin(): void {
    this.erroLogin = '';
    this.sucessoLogin = '';

    if (!this.email || !this.senha) {
      this.erroLogin = 'Preencha todos os campos!';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioEncontrado = usuarios.find((u: any) =>
      u.email === this.email && u.senha === this.senha
    );

    if (usuarioEncontrado) {
      this.sucessoLogin = 'Login realizado com sucesso!';
      localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

      // Limpar campos
      this.email = '';
      this.senha = '';
      this.loginForm.resetForm();

      setTimeout(() => {
        this.router.navigate(['/']);
        window.location.reload();
      }, 1000);
    } else {
      this.erroLogin = 'E-mail ou senha incorretos!';
    }
  }

  irParaCadastro(): void {
    this.router.navigate(['/cadastro']);
  }

  irParaEsqueciSenha(): void {
    this.router.navigate(['/esqueci-senha']);
  }
}