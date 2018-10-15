var request = require('request');
var gitlab_private_token = process.env.token;


module.exports = {
    eks_pipeline:function() {
        var eks = {  
            url: 'https://gitlab.openebs.ci/api/v4/projects/27/pipelines?ref=master',
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(eks, function(err, response, body) {
                if (err  || response.statusCode != 200) {
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

    eks_jobs:function(id) {
        var eks_job = {
            url: "https://gitlab.openebs.ci/api/v4/projects/27/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(eks_job, function(err, response, body) {
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