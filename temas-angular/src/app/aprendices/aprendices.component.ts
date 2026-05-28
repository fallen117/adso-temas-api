import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AprendicesService } from './aprendices.service';
import { Aprendiz } from './aprendiz.model';

@Component({
  selector: 'app-aprendices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aprendices.component.html',
  styleUrls: ['./aprendices.component.css'],
})
export class AprendicesComponent implements OnInit {

  private aprendicesService = inject(AprendicesService);
  private cdr = inject(ChangeDetectorRef);

  aprendices: Aprendiz[] = [];

  nuevoCedula = '';
  nuevoNombreCompleto = '';
  nuevaFechaNacimiento = '';

  editandoId: number | null = null;
  editandoCedula = '';
  editandoNombreCompleto = '';
  editandoFechaNacimiento = '';

  mensaje: { texto: string; tipo: 'success' | 'error' } | null = null;

  cargando = false;

  ngOnInit(): void {
    this.cargarAprendices();
  }

  cargarAprendices(): void {
    this.cargando = true;
    this.cdr.detectChanges();
    this.aprendicesService.getAll().subscribe({
      next: (data) => {
        this.aprendices = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al cargar aprendices:', err);
        this.mostrarMensaje('Error al cargar los aprendices.', 'error');
        this.cargando = false;
        this.cdr.detectChanges();
      },
    });
  }

  crearAprendiz(): void {
    const cedula = this.nuevoCedula.trim();
    const nombre = this.nuevoNombreCompleto.trim();
    const fecha = this.nuevaFechaNacimiento.trim();
    if (!cedula || !nombre || !fecha) return;

    this.aprendicesService.create({ cedula, nombreCompleto: nombre, fechaNacimiento: fecha }).subscribe({
      next: () => {
        this.nuevoCedula = '';
        this.nuevoNombreCompleto = '';
        this.nuevaFechaNacimiento = '';
        this.cargarAprendices();
        this.mostrarMensaje('Aprendiz creado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al crear aprendiz:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al crear el aprendiz.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  iniciarEdicion(aprendiz: Aprendiz): void {
    this.editandoId = aprendiz.id;
    this.editandoCedula = aprendiz.cedula;
    this.editandoNombreCompleto = aprendiz.nombreCompleto;
    this.editandoFechaNacimiento = aprendiz.fechaNacimiento;
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editandoCedula = '';
    this.editandoNombreCompleto = '';
    this.editandoFechaNacimiento = '';
  }

  guardarEdicion(id: number): void {
    const cedula = this.editandoCedula.trim();
    const nombre = this.editandoNombreCompleto.trim();
    const fecha = this.editandoFechaNacimiento.trim();
    if (!cedula || !nombre || !fecha) return;

    this.aprendicesService.update(id, { cedula, nombreCompleto: nombre, fechaNacimiento: fecha }).subscribe({
      next: () => {
        this.cancelarEdicion();
        this.cargarAprendices();
        this.mostrarMensaje('Aprendiz actualizado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al actualizar aprendiz:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al actualizar el aprendiz.';
        this.mostrarMensaje(Array.isArray(msg) ? msg[0] : msg, 'error');
        this.cdr.detectChanges();
      },
    });
  }

  eliminarAprendiz(id: number): void {
    if (!confirm('Seguro que deseas eliminar este aprendiz?')) return;

    this.aprendicesService.remove(id).subscribe({
      next: () => {
        this.cargarAprendices();
        this.mostrarMensaje('Aprendiz eliminado exitosamente.', 'success');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error al eliminar aprendiz:', err);
        const msg = err.error && typeof err.error === 'object' && err.error?.message
          ? err.error.message
          : 'Error al eliminar el aprendiz.';
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
