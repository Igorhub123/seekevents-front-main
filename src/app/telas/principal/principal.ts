import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../service/auth.service'
import { EventoService } from '../../service/cadeve.service';
import { Cadeve } from '../../interface/cadeve.model';
import { PaginationComponent } from '../../paginacao/pagination';
import { TruncatePipe } from '../../shared/pipes/truncate-pipe';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbCarouselModule, PaginationComponent, TruncatePipe],
  templateUrl: './principal.html',
  styleUrls: ['./principal.scss']
})
export class Principal implements OnInit {
  usuariologado: string = '';
  featuredEvents: Cadeve[] = [];
  allEvents: Cadeve[] = [];
  pagedEvents: Cadeve[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalItems: number = 0;
  isLoading: boolean = true;

  categories = [
    { nome: 'Música', icon: 'bi-music-note-beamed' },
    { nome: 'Games', icon: 'bi-controller' },
    { nome: 'Palestras', icon: 'bi-lightbulb' },
    { nome: 'Arte', icon: 'bi-brush' },
    { nome: 'Networking', icon: 'bi-people' },
    { nome: 'Gastronomia', icon: 'bi-cup-hot' }
  ];

  constructor(
    private authService: AuthService,
    private eventoService: EventoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carregarEventos();
  }

  private carregarUsuarioLogado(): void {
    const usuario = this.authService.getUsuarioLogado();
    this.usuariologado = usuario ? usuario.cdunom : 'Visitante';
  }

  carregarEventos(): void {
    this.isLoading = true;
    this.eventoService.listar().subscribe({
      next: (eventos: Cadeve[]) => {
        this.allEvents = eventos;
        this.totalItems = eventos.length;
        this.featuredEvents = this.getRandomEvents(eventos, 5);
        this.updatePagedEvents();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao carregar eventos:', err);
        this.isLoading = false;
      }
    });
  }

  getRandomEvents(events: Cadeve[], count: number): Cadeve[] {
    if (events.length <= count) return [...events];
    return [...events]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  }

  updatePagedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedEvents = this.allEvents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagedEvents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterByCategory(category: string): void {
    // Implementação futura de filtro por categoria
    console.log('Filtrando por:', category);
  }

  viewEventDetails(eventId: number): void {
    this.router.navigate(['/evento', eventId]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  scrollToFooter() {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  }

}