import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tip } from './tema.model';

@Component({
  selector: 'app-tips-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips-modal.component.html',
  styleUrls: ['./tips-modal.component.css'],
})
export class TipsModalComponent implements OnInit, OnDestroy {
  @Input() tips: Tip[] = [];
  @Output() close = new EventEmitter<void>();

  private el = inject(ElementRef);

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    const el = this.el.nativeElement;
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  cerrar(): void {
    this.close.emit();
  }
}
