require("moment-duration-format");
var port = process.env.PORT || 3000;
var express = require("express"); 
var app = express();
var request = require('request');
var cors = require('cors');
var moment = require('moment');
var dateFormat = require('dateformat');
var dashboard = [], pipelines = [] , commits_data = [], last_update, aws_job = [], gcp_job = [], azure_job = [];
var gitlab_private_token = process.env.token;

var cloud = [{"cloud_id":1,"cloud_name":"aws"},{"cloud_id":2,"cloud_name":"gce"}];

function commits() {
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

function aws_pipeline() {
    var aws = {  
        url: 'https://gitlab.openebs.ci/api/v4/projects/7/pipelines',
        headers: {'PRIVATE-TOKEN': gitlab_private_token}
    };
    return new Promise(function(resolve, reject){
        request(aws, function(err, response, body) {
            if (err  || response.statusCode != 200) {
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

function aws_jobs(id) {
    var aws_jobs = {
        url: "https://gitlab.openebs.ci/api/v4/projects/7/pipelines/+"+id+"/jobs",
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

function gcp_pipeline() {
    var aws = {  
        url: 'https://gitlab.openebs.ci/api/v4/projects/9/pipelines',
        headers: {'PRIVATE-TOKEN': gitlab_private_token}
    };
    return new Promise(function(resolve, reject){
        request(aws, function(err, response, body) {
            if (err  || response.statusCode != 200) {
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

function gcp_jobs(id) {
    var gcp_jobs = {
        url: "https://gitlab.openebs.ci/api/v4/projects/9/pipelines/+"+id+"/jobs",
        headers: {'PRIVATE-TOKEN': gitlab_private_token}
    };
    return new Promise(function(resolve, reject){
        request(gcp_jobs, function(err, response, body) {
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

function azure_pipeline() {
    var azure = {
        url: 'https://gitlab.openebs.ci/api/v4/projects/19/pipelines',
        headers: {'PRIVATE-TOKEN': gitlab_private_token}
    };
    return new Promise(function(resolve, reject) {
        request(azure, function(err, response, body) {
            if (err || response.statusCode != 200) {
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

function azure_jobs(id) {
    var azure_jobs = {
        url: "https://gitlab.openebs.ci/api/v4/projects/19/pipelines/+"+id+"/jobs",
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

function calculate(t1)
{
    var t2 = dateFormat((new Date()), "UTC:yyyy-mm-dd,HH:MM:ss");
    t2 = moment(t2, 'YYYY-M-DD,HH:mm:ss');
    t1 = moment(t1, 'YYYY-M-DD,HH:mm:ss');
    t1 = moment.duration((t2.diff(t1, 'second')), "seconds").format("h [Hours] m [minutes]");
    return t1;
}

function main() {
    setInterval(function() {
        aws_pipeline().then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var p_id = data[i].id;
                data[i].cloud_id = 1;
                data[i].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:2232',display:'10+seconds',pause:!f,section:1,value:10000),time:(from:now-1h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + data[i].sha + "',type:phrase),type:phrase,value:'" + data[i].sha + "'),query:(match:(commit_id:(query:'" + data[i].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
                var k = 0;
                if (aws_job != "" && aws_job[k] != undefined) {
                    while(aws_job[k][0].pipeline.id !== p_id) {
                        k++;
                        if(aws_job[k] == undefined) {
                            break;
                        }
                    }
                    if(aws_job[k] != undefined && aws_job[k][0].pipeline.id == p_id) {
                        data[i].jobs = aws_job[k];
                        k = 0;
                    }
                }
            }
            pipelines[0] = data;
        }).catch(function (err) {
            console.log("aws pipeline error ->",err);
        }).then(function() {
            var index = 0;
            if (pipelines[0] != undefined) {
                for(var p = 0; p < pipelines[0].length; p++) {
                    aws_jobs(pipelines[0][p].id).then(function(data) {
                        aws_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("aws jobs error ->",err);
        });
        gcp_pipeline().then(function(data) {
            for (var j = 0; j < data.length; j++) {
                var p_id = data[j].id;
                data[j].cloud_id = 2;
                data[j].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:2232',display:'10+seconds',pause:!f,section:1,value:10000),time:(from:now-1h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + data[j].sha + "',type:phrase),type:phrase,value:'" + data[j].sha + "'),query:(match:(commit_id:(query:'" + data[j].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
                var k = 0;
                if (gcp_job != "" && gcp_job[k] != undefined) {
                    while(gcp_job[k][0].pipeline.id !== p_id) {
                        k++;
                        if(gcp_job[k] == undefined) {
                            break;
                        }
                    }
                    if(gcp_job[k] != undefined && gcp_job[k][0].pipeline.id == p_id) {
                        data[j].jobs = gcp_job[k];
                        k = 0;
                    }
                }
            }
            pipelines[1] = data;
        }).catch(function (err) {
            console.log("gcp pipeline error ->",err);
        }).then(function() {
            var index = 0;
            if (pipelines[1] != undefined) {
                for(var p = 0; p < pipelines[1].length; p++) {
                    gcp_jobs(pipelines[1][p].id).then(function(data) {
                        gcp_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("gcp jobs error ->",err);
        });
        azure_pipeline().then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var p_id = data[i].id;
                data[i].cloud_id = 4;
                data[i].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:2232',display:'10+seconds',pause:!f,section:1,value:10000),time:(from:now-1h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + data[i].sha + "',type:phrase),type:phrase,value:'" + data[i].sha + "'),query:(match:(commit_id:(query:'" + data[i].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
                var k = 0;
                if (azure_job != "" && azure_job[k] != undefined) {
                    while(azure_job[k][0].pipeline.id !== p_id) {
                        k++;
                        if(azure_job[k] == undefined) {
                            break;
                        }
                    }
                    if(azure_job[k] != undefined && azure_job[k][0].pipeline.id == p_id) {
                        data[i].jobs = azure_job[k];
                        k = 0;
                    }
                }
            }
            pipelines[3] = data;
        }).catch(function (err) {
            console.log("azure pipeline error ->",err);
        }).then(function() {
            var index = 0;
            if (pipelines[3] != undefined) {
                for(var p = 0; p < pipelines[3].length; p++) {
                    azure_jobs(pipelines[3][p].id).then(function(data) {
                        azure_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("azure jobs error ->",err);
        });
        commits().then(function(data) {
            last_update = calculate(data[0].created_at);
            for (var k = 0; k < data.length; k++) {
                data[k].project_name = "v0.7-RC1";
                data[k].commit_url = "https://github.com/openebs/e2e-infrastructure/commit/" + data[k].id;
            }
            commits_data = data;
        }).catch(function (err) {
            console.log("commits error ->",err);
        });
        dashboard = { "dashboard" : { "pipelines": pipelines , "commits" : commits_data, "last_updated" : last_update, "cloud" : cloud }}; 
        app.get("/", function(req, res)  {
            res.json(dashboard);
        });
    },20000 );
}
app.listen(port, function() {
    console.log("server is listening on port:", port);
});
app.use(cors());
main();