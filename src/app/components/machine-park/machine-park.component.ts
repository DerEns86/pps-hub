import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-machine-park',
  templateUrl: './machine-park.component.html',
  styleUrl: './machine-park.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MachineParkComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['position','name', 'type', 'symbol' ];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Machines | null | undefined;
}

export interface Machines {
  name: string;
  position: number;
  type: string;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: Machines[] = [
    {
      position: 1,
      name: "Drehmaschine A",
      type: "lathe",
      symbol: "lathe.jpg",
      description: "Die Drehmaschine A ist eine Hochpräzisions-Drehmaschine mit automatischer Werkzeugwechselfunktion."
    },
    {
      position: 2,
      name: "Fräsmaschine B",
      type: "mill",
      symbol: "mill.jpg",
      description: "Die Fräsmaschine B ist eine leistungsstarke CNC-Fräsmaschine mit hoher Genauigkeit und Vielseitigkeit."
    },
    {
      position: 3,
      name: "Dreh-Fräszentrum C",
      type: "millturn.jpg",
      symbol: "<img src='drehfraeszentrum_c.jpg'>",
      description: "Das Dreh-Fräszentrum C ist eine multifunktionale Maschine, die sowohl Dreh- als auch Fräsoperationen durchführen kann."
    },
    {
      position: 4,
      name: "CNC-Drehmaschine D",
      type: "lathe2.jpg",
      symbol: "<img src='cnc_drehmaschine_d.jpg'>",
      description: "Die CNC-Drehmaschine D ist eine leistungsstarke und präzise Drehmaschine für die Herstellung von Drehteilen in großen Serien."
    },
    {
      position: 5,
      name: "Säge",
      type: "saw",
      symbol: "saw.jpg",
      description: "Die Säge ist eine große CNC-Säge, die für das Sägen bis zu einen Durchmesser von 200mm geeignet ist."
    },
    {
      position: 6,
      name: "Messure",
      type: "messure",
      symbol: "messsure.jpg",
      description: "messure description"
    },
    {
      position: 7,
      name: "CNC-Fräse G",
      type: "mill",
      symbol: "mill2.jpg",
      description: "Die CNC-Fräse G ist eine vielseitige Fräsmaschine mit hoher Leistungsfähigkeit und Genauigkeit für komplexe Bearbeitungsanforderungen."
    }
  ];