import { FunctionComponent } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/core/router/route.config'

const AppRouter: FunctionComponent = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouter