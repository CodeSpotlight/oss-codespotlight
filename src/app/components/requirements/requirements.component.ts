import { Component } from '@angular/core';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-requirements',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.scss'
})
export class RequirementsComponent {
  requirements = [
    {
      category: 'General Requirements',
      items: [
        'Star the GitHub repository within CodeSpotlight, where you participate.',
        'Contribute at least once a week for 2 months (minimum 16 hours per month).',
        'Have 10 well-documented, high-quality pull requests merged.',
        'Create or document at least 10 issues (feature requests, bugs, or improvements).',
        'Fix one deployment-related issue and/or contribute to CI/CD workflows (GitHub Actions).',
        'Participate in collaboration activities, such as co-authoring a pull request.',
        'Contribute at least 3 major documentation components.',
        'Prepare a project retrospective report summarizing contributions.',
        'Follow CodeSpotlight on GitHub, LinkedIn and X:',
      ],
      socialLinks: [
        {
          url: 'https://github.com/CodeSpotlight',
          icon: 'github',
        },
        {
          url: 'https://www.linkedin.com/company/code-spotlight',
          icon: 'linkedin',
        },
        {
          url: 'https://x.com/code_spotlight',
          icon: 'x',
        },
      ],
    },
    {
      category: 'Frontend Requirements',
      items: [
        'Build or enhance responsive UI components with consistent design.',
        'Ensure components pass accessibility (a11y) standards like WCAG.',
        'Refactor 3 components for better performance and readability.',
        'Write 5 automated frontend tests using tools like Jest, Cypress, or Playwright.',
        'Implement at least 1 end-to-end feature (e.g., dashboard, forms).',
        'Improve or implement state management solutions like Redux, NgRx, or React Context.',
      ],
    },
    {
      category: 'Backend Requirements',
      items: [
        'Design and implement at least 1 RESTful or GraphQL API endpoint.',
        'Add a new database schema, table, or query with migrations.',
        'Write 5 backend tests (unit and integration).',
        'Integrate or improve user authentication (e.g., JWT, OAuth).',
        'Optimize performance by caching or improving query times.',
        'Fix a deployment-related bug or improve Docker settings.',
        'Implement better error handling and logging practices.',
      ],
    },
  ];

}
