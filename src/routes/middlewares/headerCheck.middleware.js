/**
 * @class HeaderCheckMiddleware
 * @description Middleware to handle the Content-Type based on Accept header.
 */
class HeaderCheck {
    /**
     * Set headers based on the Accept header.
     * 
     * @param Express.Request req 
     * @param Express.Response res 
     * @param Express.NextFunction next 
     */
    setHeaders = (req, res, next) => {
        if(req.headers.accept) {
            switch(req.headers.accept) {
                case "application/xml":
                case "application/json":
                case "application/x-yaml":
                    res.set("Content-Type", req.headers.accept);
                    break;
                default:
                    res.set("Content-Type", "application/json");
                    break;
            }
        } else {
            res.set("Content-Type", "application/json");
        }
        
        next();
    }
}

module.exports = new HeaderCheck;