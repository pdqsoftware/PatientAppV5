import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import jsPDF from 'jspdf';
//import 'jspdf-autotable';
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
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
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
export class PatientListComponent {
  patients: Patient[] = [];
  outputMode: 'table' | 'pdf' = 'table';
  //displayedColumns: string[] = ['name', 'surname', 'id', 'age', 'bmi', 'actions'];
  displayedColumns: string[] = ['name', 'surname', 'id', 'age', 'gender', 'weight', 'height', 'bmi', 'actions'];
  editingId: number | null = null;



  constructor(private patientService: PatientService) {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAll().subscribe(patients => {
      this.patients = patients.map(p => ({
        ...p,
        age: this.calculateAge(p.dateOfBirth),
        bmi: p.weightKg && p.heightCm ? this.calculateBMI(p.weightKg, p.heightCm) : undefined
      }));
    });
  }

  startEdit(id: number): void {
    this.editingId = id;
  }

  cancelEdit(): void {
    this.editingId = null;
    this.loadPatients(); // Reload to undo unsaved edits
  }

  saveEdit(p: Patient): void {
    this.patientService.updatePartial(p).subscribe(() => {
      this.editingId = null;
      this.loadPatients(); // Refresh
    });
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.delete(id).subscribe(() => {
        this.loadPatients(); // Refresh list
      });
    }
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

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Patient List', 10, 10);
    const tableData = this.patients.map(p => [
      p.name,
      p.surname,
      p.southAfricanIdNumber
    ]);
    (doc as any).autoTable({
      head: [['Name', 'Surname', 'SA ID Number']],
      body: tableData,
      startY: 20
    });
    doc.save('patients.pdf');
  }
}
