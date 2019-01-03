var request = require('request');
var gitlab_private_token = process.env.token;


module.exports = {
    istgt_pipeline:function() {
        var istgt = {
            url: "https://gitlab.openebs.ci/api/v4/projects/18/pipelines",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(istgt, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    resolve(data);
                }
            });
        });
    },

    istgt_jobs:function(id) {
        var istgt_job = {
            url: "https://gitlab.openebs.ci/api/v4/projects/18/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(istgt_job, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    resolve(data);
                }
            });
        });
    },

    cstor_pipeline:function() {
        var cstor = {
            url: "https://gitlab.openebs.ci/api/v4/projects/17/pipelines",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(cstor, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    resolve(data);
                }
            });
        });
    },

    cstor_jobs:function(id) {
        var cstor_job = {
            url: "https://gitlab.openebs.ci/api/v4/projects/17/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(cstor_job, function(err, response, body) {
                if (err  || response.statusCode != 200) {
                    reject(err);
                } else {
                    data = JSON.parse(body)
                    resolve(data);
                }
            });
        });
    },

    maya_pipeline:function() {
        var maya = {
            url: "https://gitlab.openebs.ci/api/v4/projects/8/pipelines?ref=master",
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

    maya_jobs:function(id) {
        var maya_job = {
            url: "https://gitlab.openebs.ci/api/v4/projects/8/pipelines/+"+id+"/jobs?per_page=50",
            headers: {'PRIVATE-TOKEN': gitlab_private_token}
        };
        return new Promise(function(resolve, reject){
            request(maya_job, function(err, response, body) {
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

    jiva_pipeline:function() {
        var jiva = {
            url: "https://gitlab.openebs.ci/api/v4/projects/7/pipelines?ref=master",
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
    },
    jiva_jobs:function(id) {
        var jiva = {
            url: "https://gitlab.openebs.ci/api/v4/projects/7/pipelines/+"+id+"/jobs?per_page=50",
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
    },
};