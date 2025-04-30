import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  socialLinks = [
    { icon: 'github', url: 'https://github.com/CodeSpotlight'},
    { icon: 'linkedin', url: 'https://www.linkedin.com/company/codespotlightdev'},
    { icon: 'x', url: 'https://x.com/codespotlightdv'},
    { icon: 'instagram', url: 'https://instagram.com/codespotlightdev'},
  ];
}
