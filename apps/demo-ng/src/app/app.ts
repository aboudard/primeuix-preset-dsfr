import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TabsModule } from 'primeng/tabs';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

interface Row {
  city: string;
  dept: string;
  pop: number;
}

@Component({
  imports: [
    RouterModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    MessageModule,
    RadioButtonModule,
    SelectModule,
    TableModule,
    TabsModule,
    TagModule,
    TextareaModule,
    ToggleSwitchModule,
  ],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly dark = signal(false);
  protected name = '';
  protected accepted = false;
  protected choice = 'Oui';
  protected notify = true;
  protected region: string | undefined;
  protected readonly regions = ['Bretagne', 'Normandie', 'Occitanie'];
  protected selected: Row | undefined;
  protected readonly rows: Row[] = [
    { city: 'Paris', dept: '75', pop: 2103778 },
    { city: 'Marseille', dept: '13', pop: 877215 },
    { city: 'Lyon', dept: '69', pop: 520774 },
    { city: 'Toulouse', dept: '31', pop: 504078 },
    { city: 'Nice', dept: '06', pop: 348085 },
  ];

  protected toggleTheme(): void {
    this.dark.update((v) => !v);
    document.documentElement.setAttribute(
      'data-fr-theme',
      this.dark() ? 'dark' : 'light',
    );
  }
}
