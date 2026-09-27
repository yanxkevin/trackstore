import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.css']
})
export class EsqueciSenhaComponent {
  // ========== CONTROLE DE ETAPAS ==========
  // 1 = Digitar e-mail
  // 2 = Digitar código
  // 3 = Digitar nova senha
  etapa: number = 1;

  // ========== DADOS ==========
  email: string = '';
  codigoGerado: string = '';
  codigoDigitado: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  // ========== MENSAGENS ==========
  erro: string = '';
  sucesso: string = '';

  constructor(private router: Router) {}

  // ========== GETTERS PARA VALIDAÇÃO DA NOVA SENHA ==========
  get temMinimo8(): boolean {
    return this.novaSenha.length >= 8;
  }

  get temMaximo20(): boolean {
    return this.novaSenha.length <= 20;
  }

  get temMaiuscula(): boolean {
    return /[A-Z]/.test(this.novaSenha);
  }

  get temMinuscula(): boolean {
    return /[a-z]/.test(this.novaSenha);
  }

  get temNumero(): boolean {
    return /[0-9]/.test(this.novaSenha);
  }

  get temEspecial(): boolean {
    return /[!@#$%^&*(),.?":{}|<>_\-\[\]\/\\;'`~+=]/.test(this.novaSenha);
  }

  validarSenhaForte(senha: string): boolean {
    return this.temMinimo8 && this.temMaximo20 && this.temMaiuscula &&
           this.temMinuscula && this.temNumero && this.temEspecial;
  }

  // ========== ETAPA 1: ENVIAR CÓDIGO ==========
  enviarCodigo(): void {
    this.erro = '';
    this.sucesso = '';

    // Validar e-mail
    if (!this.email) {
      this.erro = 'Digite seu e-mail!';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.erro = 'Digite um e-mail válido!';
      return;
    }

    // Verificar se o e-mail existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find((u: any) => u.email === this.email);

    if (!usuarioEncontrado) {
      this.erro = 'E-mail não encontrado em nosso sistema!';
      return;
    }

    // Gerar código de 6 dígitos
    this.codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();

    // Simular envio do e-mail (mostra no console)
    console.log('CÓDIGO DE RECUPERAÇÃO:', this.codigoGerado);
    console.log(`Enviado para: ${this.email}`);

    // Mostrar sucesso e ir para etapa 2
    this.sucesso = `Código enviado para ${this.email}`;

    // ⚠️ SIMULAÇÃO: mostra o código na tela (em produção seria enviado por e-mail)
    alert(`📧 SIMULAÇÃO DE E-MAIL\n\nSeu código de recuperação é: ${this.codigoGerado}`);

    this.etapa = 2;
  }

  // ========== ETAPA 2: VERIFICAR CÓDIGO ==========
  verificarCodigo(): void {
    this.erro = '';
    this.sucesso = '';

    if (!this.codigoDigitado) {
      this.erro = 'Digite o código de verificação!';
      return;
    }

    if (this.codigoDigitado.length !== 6) {
      this.erro = 'O código deve ter 6 dígitos!';
      return;
    }

    if (this.codigoDigitado !== this.codigoGerado) {
      this.erro = 'Código incorreto! Tente novamente.';
      return;
    }

    // Código correto → vai para etapa 3
    this.sucesso = 'Código verificado com sucesso!';
    this.etapa = 3;
  }

  // ========== ETAPA 3: REDEFINIR SENHA ==========
  redefinirSenha(): void {
    this.erro = '';
    this.sucesso = '';

    // Validar nova senha
    if (!this.novaSenha || !this.validarSenhaForte(this.novaSenha)) {
      this.erro = 'A senha não atende todos os requisitos!';
      return;
    }

    // Validar confirmação
    if (!this.confirmarNovaSenha || this.confirmarNovaSenha !== this.novaSenha) {
      this.erro = 'As senhas não coincidem!';
      return;
    }

    // Atualizar a senha no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex((u: any) => u.email === this.email);

    if (index === -1) {
      this.erro = 'Erro ao atualizar a senha. Tente novamente.';
      return;
    }

    usuarios[index].senha = this.novaSenha;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.sucesso = 'Senha redefinida com sucesso! Redirecionando...';

    // Redirecionar para o login após 2 segundos
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  // ========== REENVIAR CÓDIGO ==========
  reenviarCodigo(): void {
    this.codigoGerado = Math.floor(100000 + Math.random() * 900000).toString();
    this.codigoDigitado = '';
    this.erro = '';
    this.sucesso = `Novo código enviado para ${this.email}`;
    alert(`📧 NOVO CÓDIGO: ${this.codigoGerado}`);
  }

  // ========== VOLTAR PARA ETAPA ANTERIOR ==========
  voltarEtapa(): void {
    if (this.etapa === 2) {
      this.etapa = 1;
      this.codigoDigitado = '';
    } else if (this.etapa === 3) {
      this.etapa = 2;
      this.novaSenha = '';
      this.confirmarNovaSenha = '';
    }
    this.erro = '';
    this.sucesso = '';
  }

  // ========== IR PARA LOGIN ==========
  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}