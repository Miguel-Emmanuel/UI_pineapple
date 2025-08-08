import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login', () => {
  it('renders login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeDefined();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeDefined();
    expect(screen.getByPlaceholderText('Contraseña')).toBeDefined();
  });
});
