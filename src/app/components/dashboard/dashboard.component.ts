import { Component, inject, OnInit } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { Pets } from '../../models/pets';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'], 
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ]
})
export class DashboardComponent implements OnInit {
  typesArray: Pets[] = [
    {
      id: 83,
      name: 'Megan',
      weight: '15 kg',
      age: '16 años',
      breed: 'frenchspoodle',
      date: '17/09/2024',
      types: ["Dog", "Cat", "Parrot", "Chameleon"],
    }
  ];

  newPet: Pets = {
    id: 0,
    name: '',
    weight: '',
    age: '',
    breed: '',
    date: '',
    types: [],
  };

  speciesString: string = '';

  ngOnInit(): void {
    console.log(this.typesArray);
  }

  AgregarMascota() {
    const species = this.speciesString.split(',').map(specie => specie.trim());
    this.newPet.types = species;
    this.typesArray.push({ ...this.newPet });

    this.newPet = { id: 0, name: '', weight: '', age: '', breed: '', date: '', types: [] };
    this.speciesString = '';
  }

  private breakpointObserver = inject(BreakpointObserver);

  /** Basado en el tamaño de pantalla, cambiar de estándar a una columna por fila */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }
      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  trackById(index: number, pet: Pets): number {
    return pet.id;
  }
}
