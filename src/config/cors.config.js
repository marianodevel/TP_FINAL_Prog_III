import "dotenv/config";

export const corsOptions = {
    origin: (origin, callback)=>{
        const allowedOrigin = process.env.FRONTEND_URL;

        if(!origin || origin === allowedOrigin) {
            callback(null, true);
        }else{
            callback(new Error("No permitido por políticas de CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}