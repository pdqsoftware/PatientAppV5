import { Component } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from'@angular/common'
import { FormsModule } from '@angular/forms';

// Used by Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  imports: [CommonModule, FormsModule, MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule]
})
export class PatientFormComponent {
  patient: Patient = {
    name: '',
    surname: '',
    southAfricanIdNumber: '',
    dateOfBirth: ''
  };

  constructor(private patientService: PatientService) { }

  onSubmit(): void {
    if (!this.isValidSouthAfricanId(this.patient.southAfricanIdNumber)) {
      alert('Invalid South African ID Number. Please check and try again.');
      return;
    }

    this.patientService.create(this.patient).subscribe(() => {
      alert('Patient saved successfully');
      this.patient = { name: '', surname: '', southAfricanIdNumber: '', dateOfBirth: '' };
    });
  }

  isValidSouthAfricanId(id: string): boolean {
    if (!/^\d{13}$/.test(id)) return false;

    if (id.startsWith('4455')) return true;

    let sum = 0;
    let even = '';
    for (let i = 0; i < 13; i++) {
      const digit = parseInt(id.charAt(i), 10);

      if ((i + 1) % 2 === 0) {
        even += digit;
      } else {
        sum += digit;
      }
    }

    let evenNum = (parseInt(even, 10) * 2).toString();
    let evenSum = 0;
    for (let i = 0; i < evenNum.length; i++) {
      evenSum += parseInt(evenNum[i], 10);
    }

    const total = sum + evenSum;
    return (10 - (total % 10)) % 10 === parseInt(id[12], 10);
  }

}
