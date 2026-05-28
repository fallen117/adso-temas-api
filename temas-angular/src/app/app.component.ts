import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemasComponent } from './temas/temas.component';
import { AprendicesComponent } from './aprendices/aprendices.component';

type Tab = 'temas' | 'aprendices';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TemasComponent, AprendicesComponent],
  template: `
    <div class="app-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <div class="topbar-brand">
            <span class="brand-text">Admin</span>
          </div>
          <div class="topbar-tabs">
            <button
              class="tab-btn"
              [class.active]="activeTab === 'temas'"
              (click)="activeTab = 'temas'"
            >Temas</button>
            <button
              class="tab-btn"
              [class.active]="activeTab === 'aprendices'"
              (click)="activeTab = 'aprendices'"
            >Aprendices</button>
          </div>
          <span class="topbar-version">Angular v21</span>
        </div>
      </header>
      <main>
        <app-temas *ngIf="activeTab === 'temas'"></app-temas>
        <app-aprendices *ngIf="activeTab === 'aprendices'"></app-aprendices>
      </main>
    </div>
  `,
  styles: [`
    .app-shell {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .topbar {
      background: rgba(26, 26, 46, 0.8);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .topbar-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .topbar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 16px;
      text-decoration: none;
      white-space: nowrap;
    }

    .brand-text {
      font-weight: 300;
      letter-spacing: 0.5px;
    }

    .topbar-tabs {
      display: flex;
      gap: 4px;
    }

    .tab-btn {
      background: transparent;
      color: rgba(255, 255, 255, 0.55);
      border: none;
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .tab-btn.active {
      background: var(--gradient-accent);
      color: #fff;
      box-shadow: 0 2px 8px rgba(229, 57, 53, 0.3);
    }

    .topbar-version {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
      font-size: 12px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
      letter-spacing: 0.5px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      white-space: nowrap;
    }

    main {
      flex: 1;
    }
  `],
})
export class AppComponent {
  activeTab: Tab = 'temas';
}
