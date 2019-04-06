//send email 

exports.sendRegisterEmail = (request, to, context) => {
    let config = request.server.configManager;
    if (!to) {
        to = { name: request.payload.name, address: request.payload.email }
    }
    let emailData = {
        "from": config.get('web.email.from'),
        "to": to,
        "subject": "Welcome",
        "html": "Welcome",
        "template": {
            "name": "register",
            "context": context
        },
        "text": ""
    };

    let queue = request.server.plugins['hapi-kue'];
    queue.createJob('api-sendmail', emailData, (err) => {
        if (err) {
            request.log(['error'], 'Error: registration email published to queue');
        } else {
            request.log(['info'], 'registration email published to queue');
        }

    });
}

exports.sendForgotPasswordEmail = (request, to, context) => {
    let config = request.server.configManager;
    if (!to) {
        to = { name: request.payload.name, address: request.payload.email }
    }
    let emailData = {
        "from": config.get('web.email.from'),
        "to": to,
        "subject": "Moony - Quên mật khẩu",
        "html": "Forgot password",
        "template": {
            "name": "forgotpass",
            "context": context
        },
        "text": ""
    };

    let queue = request.server.plugins['hapi-kue'];
    queue.createJob('api-sendmail', emailData, (err) => {
        if (err) {
            request.log(['error'], 'Error: forgot password email published to queue');
        } else {
            request.log(['info'], 'forgot password email published to queue');
        }

    });
}

exports.sendReviewApprovedEmail = (request, to, context) => {
    let config = request.server.configManager;
    if (!to) {
        // to = { name: request.payload.name, address: request.payload.email }
        return;
    }
    let emailData = {
        "from": config.get('web.email.from'),
        "to": to,
        "subject": "Moony - bài chia sẻ được duyệt",
        // "html": "Forgot password",
        "template": {
            "name": "reviewapproved",
            "context": context
        },
        // "text": ""
    };

    let queue = request.server.plugins['hapi-kue'];
    queue.createJob('api-sendmail', emailData, (err) => {
        if (err) {
            request.log(['error'], 'Error: forgot password email published to queue');
        } else {
            request.log(['info'], 'forgot password email published to queue');
        }
    });
}