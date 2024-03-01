import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProjectsComponent {
  dataSource = PROJECT_DATA;
  columnsToDisplay = ['projectId', 'customer', 'deliveryDate'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: ProjectElement | null | undefined;
}

export interface ProjectElement {
  projectId: number;
  customer: string;
  deliveryDate: string | Date;
  symbol: string;
  description: string;
}

const PROJECT_DATA: ProjectElement[] = [
  {
    projectId: 1,
    customer: 'Hydrogen',
    deliveryDate: new Date(1709292697711).toLocaleDateString('en-gb').replace(/\//g, '.'),
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
  },
  {
    projectId: 2,
    customer: 'Helium',
    deliveryDate: new Date(1709292697711),
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
  }
];