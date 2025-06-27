import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventoService } from '../../service/cadeve.service';
import { Cadeve } from '../../interface/cadeve.model';
import { switchMap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detalhe-evente.html',
  styleUrls: ['./detalhe-evente.scss']
})
export class EventDetailsComponent implements OnInit {
  event: Cadeve | null = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService
  ) { }

  ngOnInit(): void {
    this.loadEventDetails();
  }

  private loadEventDetails(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const eventId = Number(params.get('id'));
        if (isNaN(eventId)) {
          throw new Error('ID do evento inválido');
        }
        return this.eventoService.getEventoById(eventId).pipe(
          catchError(err => {
            console.error('Erro na requisição:', err);
            throw err;
          })
        );
      })
    ).subscribe({
      next: (evento: Cadeve) => {
        if (!evento) {
          throw new Error('Evento não encontrado');
        }
        this.event = evento;
        this.isLoading = false;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Erro ao carregar evento:', err);
        this.errorMessage = 'Não foi possível carregar os detalhes do evento.';
        this.isLoading = false;
        // this.router.navigate(['/']); // Opcional: redirecionar após erro
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  buyTicket(): void {
    if (this.event) {
      console.log('Comprando ingresso para:', this.event.caenom);
      // this.router.navigate(['/checkout', this.event.caeide]);
    }
  }
}