import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../auth/auth.service'; // Dein AuthService
import { Router } from '@angular/router';
import { mockAuthService } from '../../services/mock-service'; // Import der Mocks
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { SnackbarService } from '../../services/snackbar.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = { navigateByUrl: jest.fn() };
  let mockSnackbarService = { openSnackBar: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        BrowserAnimationsModule, LoginComponent],
    providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: SnackbarService, useValue: mockSnackbarService } // Snackbar mocken
    ],
}).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a form with email and password fields', () => {
    const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;

    // Am Anfang ist das Formular ungültig
    expect(submitButton.disabled).toBeTruthy();

    // Setze gültige Werte für die E-Mail und das Passwort
    component.loginForm.setValue({ email: 'test@test.com', password: 'password123' });
    fixture.detectChanges(); // Erneut Rendern, um Änderungen zu sehen

    // Der Submit-Button sollte nun aktiviert sein
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should show loading spinner when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    // Überprüfen, ob der Progress-Bar angezeigt wird
    const progressBar = fixture.debugElement.query(By.css('mat-progress-bar'));
    expect(progressBar).toBeTruthy();
  });

  it('should call AuthService.login and navigate to dashboard on form submit', async () => {
    // Fülle das Formular mit gültigen Daten
    component.loginForm.setValue({ email: 'test@test.com', password: 'password123' });
    
    // Erzwinge die Formularabsendung, entweder durch Klick auf den Submit-Button
    // const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    // submitButton.click();
    await component.onSubmit();

    // Warte, bis alle asynchronen Vorgänge abgeschlossen sind
    await fixture.whenStable();
  
    // Überprüfe, dass AuthService.login mit den richtigen Parametern aufgerufen wurde
    expect(mockAuthService.login).toHaveBeenCalledWith('test@test.com', 'password123');
  
    // Überprüfen, dass der Router zur Dashboard-Seite navigiert wurde
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });
  

  it('should show error message on login failure', async () => {
    // Simuliere einen Fehler bei der Anmeldung
    mockAuthService.login.mockRejectedValueOnce(new Error('Invalid credentials'));
  
    // Setze gültige Werte für das Formular
    component.loginForm.setValue({ email: 'wrong@test.com', password: 'wrongPassword' });
  
    // Rufe onSubmit auf, um den Fehler zu provozieren
    await component.onSubmit();
  
    // Warte, bis alle asynchronen Aktionen abgeschlossen sind
    await fixture.whenStable();
  
    // Überprüfen, dass der Snackbar-Service mit der richtigen Fehlermeldung aufgerufen wurde
    expect(mockSnackbarService.openSnackBar).toHaveBeenCalledWith('Invalid credentials', 'error-snackbar');
  });
});

