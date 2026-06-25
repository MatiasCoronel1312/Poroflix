import React from 'react'
import ProtectedRoute from './ProtectedRoute'
import Play from '@/pages/Play'
import { useParams } from 'react-router-dom';

const PlayRoute = () => {
    const { type, id } = useParams();
  return (
    <ProtectedRoute>
        <Play type={type} id={id} />
    </ProtectedRoute>
  )
}

export default PlayRoute