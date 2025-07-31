import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Used by Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio'


@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  imports: [CommonModule, FormsModule, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule
  ]
})
export class PatientSearchComponent {
  surname = '';
  idNumber = '';
  results: Patient[] = [];
  displayedColumns: string[] = ['name', 'surname', 'id', 'age', 'gender', 'weight', 'height', 'bmi'];


  constructor(private patientService: PatientService) { }

  search(): void {
    this.patientService.search(this.surname, this.idNumber).subscribe(patients => {
      this.results = patients.map(p => ({
        ...p,
        age: this.calculateAge(p.dateOfBirth),
        bmi: p.weightKg && p.heightCm ? this.calculateBMI(p.weightKg, p.heightCm) : undefined
      }));
    });
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculateBMI(weightKg: number, heightCm: number): number {
    const heightM = heightCm / 100;
    return +(weightKg / (heightM * heightM)).toFixed(2);
  }
}
