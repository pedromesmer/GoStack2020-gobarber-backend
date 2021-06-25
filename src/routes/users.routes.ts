import { request, response, Router} from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import CreateUserService from '../services/CreateUserService'
import UpdateUSerAvatarService from '../services/UpdateUserAvatarService'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body
        const createUser = new CreateUserService()

        const user = await createUser.execute({
            name,
            email,
            password
        })

        // @ts-expect-error
        delete user.password

        return response.json(user)
    } catch (error) {
        return response.status(400).json({
            error: error.message
        })
    }
})

usersRouter.patch('/avatar',ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    
    
    const updateUserAvatar =  new UpdateUSerAvatarService()

    const user = await updateUserAvatar.execute ({
        user_id: request.user.id,
        avatarFilename: request.file.filename
    })

    // @ts-expect-error
    delete user.password

    return response.json(user)

    
})

export default usersRouter
