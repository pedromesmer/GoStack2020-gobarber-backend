import { Router } from 'express'

import appointmentsRouter from './appointments.routes'
import usersRouter from './users.routes'
import sessionsRouter from './sessions.routes'

const routes = Router()

// toda rota com '/appointments' entra nessa função, enviando o resto da rota
routes.use('/appointments', appointmentsRouter)
// toda rota com '/users' entra nessa função, enviando o resto da rota
routes.use('/users', usersRouter)
// toda rota com '/sessions' entra nessa função, enviando o resto da rota
routes.use('/sessions', sessionsRouter)


export default routes
