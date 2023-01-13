import { useContext } from 'react'
import { UiContext } from '../context/ui'


export const useUi = () => {
    return useContext(UiContext)
}
