var request = require('request');
var gitlab_private_token = process.env.token;

module.exports = {
    commits:function() {
        var commit = {
            url: 'https://gitlab.openebs.ci/api/v4/projects/8/repository/commits?ref_name=v0.7-RC1',
            headers: {'PRIVATE-TOKEN': gitlab_private_token} 
        };
        return new Promise(function(resolve, reject){
            request(commit, function(err, response, body) {
                if(err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    var data = [];
                    body = JSON.parse(body);
                    if (body.length > 10) {
                        for (var i = 0; i < 10; i++) {
                            data[i] = body[i]
                        }
                        resolve(data);
                    } else {
                        resolve(body);
                    }
                }
            });
        });
    }
}