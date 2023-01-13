import { useContext } from 'react'
import { PatientContext } from '../context/patients'



export const usePatients = () => {
    return useContext(PatientContext)
}

