import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Cadeve } from '../../interface/cadeve.model';
import { EnderecoService } from '../../service/cadend.service';
import { TabelaDivulgacaoService } from '../../service/tabeladivulgacao.service';
import { PagamentoService } from '../../service/pagamento.service';
import { EventoService } from '../../service/cadeve.service';
import { CategoriaService } from '../../service/categoria.service';

@Component({
    selector: 'app-cadastro-evento',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './cadeve.html',
    styleUrls: ['./cadeve.scss']
})
export class CadastroEvento implements OnInit {
    evento: Cadeve = {
        caenom: '',
        caedes: '',
        caedat: '',
        caeima: '',
        caesta: 'Ativo',
        cacecev: 0,
        caeend: 0,
        caetad: 0,
        caefpa: 0
    };

    categorias: any[] = [];
    enderecos: any[] = [];
    tabelas: any[] = [];
    pagamentos: any[] = [];

    constructor(
        private categoriaService: CategoriaService,
        private enderecoService: EnderecoService,
        private tabelaDivulgacaoService: TabelaDivulgacaoService,
        private pagamentoService: PagamentoService,
        private eventoService: EventoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.carregarSelects();
    }

    carregarSelects(): void {
        this.categoriaService.listar().subscribe(res => this.categorias = res);
        this.enderecoService.listar().subscribe(res => this.enderecos = res);
        this.tabelaDivulgacaoService.listar().subscribe(res => this.tabelas = res);
        this.pagamentoService.listar().subscribe(res => this.pagamentos = res);
    }

    salvar(): void {
        this.eventoService.cadastrar(this.evento).subscribe(() => {
            this.router.navigate(['/principal']);
        });
    }
}
