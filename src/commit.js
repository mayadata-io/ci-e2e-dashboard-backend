var request = require('request');
var gitlab_private_token = process.env.token;


module.exports = {
    cstor:function() {
        var cstor = {  
            url: 'https://gitlab.openebs.ci/api/v4/projects/26/repository/commits',
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(cstor, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    body = JSON.parse(body);
                    resolve(body);
                }
            });
        });
    },

    maya:function() {
        var maya = {
            url: "https://gitlab.openebs.ci/api/v4/projects/8/repository/commits",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(maya, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    // if(data != "") {
                        resolve(data);
                    // }
                }
            });
        });
    },

    jiva:function() {
        var jiva = {
            url: "https://gitlab.openebs.ci/api/v4/projects/7/repository/commits",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(jiva, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    // if(data != "") {
                        resolve(data);
                    // }
                }
            });
        });
    }
};