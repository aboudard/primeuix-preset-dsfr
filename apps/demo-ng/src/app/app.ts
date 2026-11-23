import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly dark = signal(false);
  protected name = '';
  protected accepted = false;

  protected toggleTheme(): void {
    this.dark.update((v) => !v);
    document.documentElement.setAttribute(
      'data-fr-theme',
      this.dark() ? 'dark' : 'light',
    );
  }
}
