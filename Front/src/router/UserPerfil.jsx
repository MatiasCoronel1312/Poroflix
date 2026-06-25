import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import { Perfil } from '@/pages/Perfil'

const UserPerfil = () => {
  return (
    <ProtectedRoute>
        <Perfil/>
    </ProtectedRoute>
  )
}

export default UserPerfil