import React from 'react';
import Dashboard from './components/Dashboard';
import { User } from './types';

const docenteUser: User = { firstName: 'Docente', lastName: 'UNPilar' };

export default function App() {
    return (
        <Dashboard user={docenteUser} />
    );
}