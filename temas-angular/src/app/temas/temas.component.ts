import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TemasService } from './temas.service';
import { Tema } from './tema.model';

@Component({
  selector: 'app-temas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css'],
})
export class TemasComponent implements OnInit {

  private temasService = inject(TemasService);
  private cdr = inject(ChangeDetectorRef);

  temas: Tema[] = [];

  nuevoNombre = '';

  editandoId: number | null = null;
  editandoNombre = '';

  mensaje: { texto: string; tipo: 'success' | 'error' } | null = null;

  cargando = false;

  ngOnInit(): void {
    this.cargarTemas();
  }

  cargarTemas(): void {
    this.cargando = true;
    this.cdr.detectChanges();
    this.temasService.getAll().subscribe({
      next: (data) => {
        this.temas = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar temas:', err);
        this.mostrarMensaje('Error al cargar los temas.', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  crearTema(): void {
    const nombre = this.nuevoNombre.trim();
    if (!nombre || nombre.length < 1) return;

    this.temasService.create({ nombreTema: nombre }).subscribe({
      next: () => {
        this.nuevoNombre = '';
        this.cargarTemas();
        this.mostrarMensaje('Tema creado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al crear tema:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al crear el tema.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  iniciarEdicion(tema: Tema): void {
    this.editandoId = tema.id;
    this.editandoNombre = tema.nombreTema;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editandoNombre = '';
  }

  guardarEdicion(id: number): void {
    const nombre = this.editandoNombre.trim();
    if (!nombre) return;

    this.temasService.update(id, { nombreTema: nombre }).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarTemas();
        this.mostrarMensaje('Tema actualizado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al actualizar tema:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al actualizar el tema.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  eliminarTema(id: number): void {
    if (!confirm('Seguro que deseas eliminar este tema?')) return;

    this.temasService.remove(id).subscribe({
      next: () => {
        this.cargarTemas();
        this.mostrarMensaje('Tema eliminado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al eliminar tema:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al eliminar el tema.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  private mostrarMensaje(texto: string, tipo: 'success' | 'error'): void {
    this.mensaje = { texto, tipo };
    setTimeout(() => {
      this.mensaje = null;
      this.cdr.detectChanges();
    }, 4000);
  }
}
