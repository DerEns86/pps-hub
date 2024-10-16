// mock-service.ts

// Mock für den AuthService
export const mockAuthService = {
    login: jest.fn((email: string, password: string) => 
      Promise.resolve({
        user: { uid: '123' } // Simulierte Benutzerantwort von Firebase
      })
    ),
    logout: jest.fn(() => Promise.resolve()),
    register: jest.fn((username: string, email: string, password: string) => 
      Promise.resolve({ user: { uid: '456' } }) // Simulierte Antwort bei Registrierung
    )
  };
  
  // Mock für den FirestoreService
  export const mockFirestoreService = {
    setUserData: jest.fn((userId: string, data: any) =>
      Promise.resolve()
    ),
    getUserData: jest.fn((userId: string) =>
      Promise.resolve({ name: 'Test User', email: 'test@test.com' })
    ),
  };
  
  // Mock für den EmployeeService
  export const mockEmployeeService = {
    getEmployees: jest.fn(() => 
      Promise.resolve([
        { id: '1', employeeId: '123', name: 'Doe', surname: 'John' , email: 'test@MatLine.de', activeMachine: '1', skills: ['Java', 'Angular'] },
        { id: '2', employeeId: '124', name: 'Doe', surname: 'Jane', email: 'jane@test.com', activeMachine: '2', skills: ['Java', 'React'] }
      ])
    ),
    addEmployee: jest.fn((employee: any) => 
      Promise.resolve({ id: 3, ...employee })
    ),
    updateEmployee: jest.fn((id: number, employee: any) => 
      Promise.resolve({ id, ...employee })
    ),
    deleteEmployee: jest.fn((id: string) => 
      Promise.resolve()
    )
  };
  