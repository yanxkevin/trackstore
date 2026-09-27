import { Routes } from '@angular/router';
import { VitrineComponent } from './components/vitrine/vitrine';
import { DetalhesComponent } from './components/detalhes/detalhes';
import { BuscaComponent } from './components/busca/busca';
import { CestaComponent } from './components/cesta/cesta';
import { LoginComponent } from './components/login/login';
import { CadastroComponent } from './components/cadastro/cadastro';
import { EsqueciSenhaComponent } from './components/esqueci-senha/esqueci-senha';
import { GeneroComponent } from './components/genero/genero';

export const routes: Routes = [
  { path: '', component: VitrineComponent },
  { path: 'genero/:genero', component: GeneroComponent },
  { path: 'detalhes/:id', component: DetalhesComponent },
  { path: 'busca', component: BuscaComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: '**', redirectTo: '' }
];