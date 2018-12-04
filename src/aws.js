var request = require('request');
var gitlab_private_token = process.env.token;


module.exports = {
    aws_pipeline:function() {
        var aws = {  
            url: 'https://gitlab.openebs.ci/api/v4/projects/1/pipelines?ref=master',
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(aws, function(err, response, body) {
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

    aws_jobs:function(id) {
        var aws_jobs = {
            url: "https://gitlab.openebs.ci/api/v4/projects/1/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(aws_jobs, function(err, response, body) {
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