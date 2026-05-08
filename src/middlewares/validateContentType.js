export const validateContentType = (req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        const contentType = req.headers['content-type'];
        
        if (!contentType || contentType !== 'application/json') {
            return res.status(400).send({
                estado: false,
                msg: 'Error: El formato de los datos debe ser application/json.'
            });
        }
    }
    
    
    next();
};