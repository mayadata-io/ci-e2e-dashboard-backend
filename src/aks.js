var request = require('request');
var gitlab_private_token = process.env.token;

module.exports = {
    aks_pipeline:function() {
        var azure = {
            url: 'https://gitlab.openebs100.io/api/v4/projects/10/pipelines?ref=master',
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject) {
            request(azure, function(err, response, body) {
                if (err || response.statusCode != 200) {
                    reject(err);
                } else {
                    var data = [];
                    body = JSON.parse(body);
                    // if (body.length > 10) {
                    //     for (var i = 0; i < 10; i++) {
                    //         data[i] = body[i]
                    //     }
                    //     resolve(data);
                    // } else {
                        resolve(body);
                    // }
                }
            });
        });
    },

    aks_jobs:function(id) {
        var azure_jobs = {
            url: "https://gitlab.openebs100.io/api/v4/projects/10/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(azure_jobs, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    if(data != "") {
                        resolve(data);
                    }
                }
            });
        });
    }
};
