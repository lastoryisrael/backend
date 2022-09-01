const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.JWT_SECRET;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/products(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/categories(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/businesslist(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/orders(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/orderitems(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/productbybusiness(.*)/, methods: ['GET','OPTIONS']},
            {url: /\/api\/orderbusiness(.*)/, methods: ['GET','OPTIONS']},
            '/api/signin',
            '/api/forgot',
            '/api/reset',
            '/api/signup',
            
        ]
    })
}
async function isRevoked(req, payload, done) {
    if(!payload.role) {
        done(null, true)
    }else {
        done();
    }
}

module.exports = authJwt