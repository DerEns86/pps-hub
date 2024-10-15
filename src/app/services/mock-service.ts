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
  
  // Du kannst beliebig viele Mock-Services hinzufügen, die du in deinem Projekt benötigst.
  