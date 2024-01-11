import cors from 'cors'
export const corsMiddleware = (req, res, next) => {
    cors({
        origin:(origin, callback) => {
            const ACCEPTED_ORIGINS = [
                'http://localhost:3000'
            ]
            if (ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true)
            }
            if (!origin) {
                return callback(null, true)
            }
            return callback(new Error('Not Allowed by CORS'))
        }
    })
}