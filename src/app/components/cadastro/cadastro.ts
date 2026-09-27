import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  @ViewChild('cadastroForm') cadastroForm!: NgForm;

  // Dados do formulário
  nome: string = '';
  email: string = '';
  cpf: string = '';
  telefone: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  // Mensagens
  erros: { [key: string]: string } = {};
  sucesso: string = '';
  erroGeral: string = '';

  constructor(private router: Router) {}

  // ========== GETTERS PARA VALIDAÇÃO EM TEMPO REAL ==========
  get temMinimo8(): boolean {
    return this.senha.length >= 8;
  }

  get temMaximo20(): boolean {
  return this.senha.length <= 20;
  }

  get temMaiuscula(): boolean {
    return /[A-Z]/.test(this.senha);
  }

  get temMinuscula(): boolean {
    return /[a-z]/.test(this.senha);
  }

  get temNumero(): boolean {
    return /[0-9]/.test(this.senha);
  }

  get temEspecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>_\-\[\]\/\\;'`~+=]/.test(this.senha);
  }

  // ========== VALIDAÇÃO DE CPF ==========
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  // ========== FORMATAR CPF ==========
  formatarCPF(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);

    if (valor.length <= 3) {
      this.cpf = valor;
    } else if (valor.length <= 6) {
      this.cpf = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (valor.length <= 9) {
      this.cpf = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
      this.cpf = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }
  }

  // ========== FORMATAR TELEFONE ==========
  formatarTelefone(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);

    if (valor.length <= 2) {
      this.telefone = valor;
    } else if (valor.length <= 6) {
      this.telefone = valor.replace(/(\d{2})(\d{1,4})/, '($1) $2');
    } else {
      this.telefone = valor.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    }
  }

  // ========== VALIDAR SENHA FORTE ==========
  validarSenhaForte(senha: string): boolean {
  return this.temMinimo8 && this.temMaximo20 && this.temMaiuscula && this.temMinuscula && this.temNumero && this.temEspecial;
}

  // ========== CRIAR CONTA ==========
  criarConta(): void {
    // Limpar mensagens
    this.erros = {};
    this.sucesso = '';
    this.erroGeral = '';

    // Validar Nome
    if (!this.nome || this.nome.trim().length < 3) {
      this.erros['nome'] = 'Nome deve ter pelo menos 3 caracteres';
    }

    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.erros['email'] = 'Digite um e-mail válido';
    }

    // Validar CPF
    if (!this.cpf || !this.validarCPF(this.cpf)) {
      this.erros['cpf'] = 'Digite um CPF válido';
    }

    // Validar Telefone
    const telefoneLimpo = this.telefone.replace(/\D/g, '');
    if (!this.telefone || telefoneLimpo.length < 10) {
      this.erros['telefone'] = 'Digite um telefone válido (com DDD)';
    }

    // Validar Senha Forte
    if (!this.senha || !this.validarSenhaForte(this.senha)) {
      this.erros['senha'] = 'A senha não atende todos os requisitos';
    }

    // Validar Confirmar Senha
    if (!this.confirmarSenha || this.confirmarSenha !== this.senha) {
      this.erros['confirmarSenha'] = 'As senhas não coincidem';
    }

    // Se houver erros, não continuar
    if (Object.keys(this.erros).length > 0) {
      return;
    }

    // Verificar se o e-mail já está cadastrado
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const emailExistente = usuarios.find((u: any) => u.email === this.email);

    if (emailExistente) {
      this.erroGeral = 'Este e-mail já está cadastrado!';
      return;
    }

    // Criar novo usuário
    const novoUsuario = {
      id: Date.now(),
      nome: this.nome.trim(),
      email: this.email,
      cpf: this.cpf,
      telefone: this.telefone,
      senha: this.senha
    };

    // Salvar no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensagem de sucesso
    this.sucesso = 'Conta criada com sucesso!';

    // Limpar todos os campos
    this.nome = '';
    this.email = '';
    this.cpf = '';
    this.telefone = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.erros = {};
    this.cadastroForm.resetForm();

    // Redirecionar após 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  // ========== NAVEGAR PARA LOGIN ==========
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}