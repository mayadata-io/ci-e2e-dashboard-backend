var request = require('request');
var gitlab_private_token = process.env.token;


module.exports = {
    packet_pipeline:function() {
        var packet = {  
            url: 'https://gitlab.openebs.ci/api/v4/projects/6/pipelines',
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(packet, function(err, response, body) {
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

    packet_jobs:function(id) {
        var packet_jobs = {
            url: "https://gitlab.openebs.ci/api/v4/projects/6/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(packet_jobs, function(err, response, body) {
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