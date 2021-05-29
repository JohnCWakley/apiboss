const { access, readFile, constants } = require('fs');;

module.exports = function LoadJson(path, parser = JSON.parse) {
    return new Promise((resolve, reject) => {
        access(path, constants.F_OK | constants.R_OK, err => {
            if (err) {
                reject(new Error(err.code === 'ENOENT' ? `${path} does not exist` : `cannot read ${path}`));
            } else {
                readFile(path, (err, content) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (typeof parser === 'function') {
                            content = parser(content);
                        }

                        resolve(content);
                    }
                })
            }
        })
    });
}



