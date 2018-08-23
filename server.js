var port = process.env.PORT || 3000;
require("moment-duration-format");
var express = require("express"); 
var app = express();
var request = require('request');
var cors = require('cors');
var moment = require('moment');
var dateTime = require('node-datetime');
var dashboard = [], pipelines = [] , commits_data = [], last_update;

var cloud = [{"cloud_id":1,"cloud_name":"aws"},{"cloud_id":2,"cloud_name":"gce"}];

function commits() {
    var commit = {
        url: 'https://gitlab.openebs.ci/api/v4/projects/8/repository/commits?ref_name=v0.7-RC1',
        headers: {'PRIVATE-TOKEN': 'Q3VWd1rxg3NL5Zv75jw3'} 
    };
    return new Promise(function(resolve, reject){
        request(commit, function(err, response, body) {
            if(err) {
                reject(err);
            } else {
                var data = [];
                body = JSON.parse(body);
                for(i = 0; i < 10; i++) {
                    data[i] = body[i];
                }
                resolve(data);
            }
        });
    });
}

function aws_pipeline() {
    var aws = {  
        url: 'https://gitlab.openebs.ci/api/v4/projects/7/pipelines',
        headers: {'PRIVATE-TOKEN': 'Q3VWd1rxg3NL5Zv75jw3'}
    };
    return new Promise(function(resolve, reject){
        request(aws, function(err, response, body) {
            if (err) {
                reject(err);
            } else {
                var data = [];
                body = JSON.parse(body);
                for (i = 0; i < 10; i++) {
                    data[i] = body[i];
                }
                resolve(data);
            }
        });
    });
}

function gcp_pipeline() {
    var aws = {  
        url: 'https://gitlab.openebs.ci/api/v4/projects/9/pipelines',
        headers: {'PRIVATE-TOKEN': 'Q3VWd1rxg3NL5Zv75jw3'}
    };
    return new Promise(function(resolve, reject){
        request(aws, function(err, response, body) {
            if (err) {
                reject(err);
            } else {
                var data = [];
                body = JSON.parse(body);
                for (i = 0; i < 10; i++) {
                    data[i] = body[i];
                }
                resolve(data);
            }
        });
    });
}

function calculate(t1)
{
    var t2 = dateTime.create().format('Y-m-dTH:M:S');
    t2 = moment(t2, 'YYYY-M-DDTHH:mm:ss');
    t1 = moment(t1, 'YYYY-M-DDTHH:mm:ss');
    var second = t2.diff(t1, 'second');
    t1 = moment.duration(second, "seconds").format("h [Hours] m [minutes]");
    return t1;
}

function main() {
    setInterval(function() {
        var aws_data = aws_pipeline();
        aws_data.then(function(data) {
            for (i = 0; i < data.length; i++) {
                p_id = data[i].id; 
                data[i].cloud_id = 1;
                data[i].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=()&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,key:commit_id,negate:!f,params:(query:'"+ data[i].sha + "',type:phrase),type:phrase,value:'" + data[i].sha + "'),query:(match:(commit_id:(query:'" + data[i].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
            }
            pipelines[0] = data;
        });
        var gcp_data = gcp_pipeline();
        gcp_data.then(function(data) {
            for (j = 0; j < data.length; j++) {
                p_id = data[j].id;
                data[j].cloud_id = 2;
                data[j].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=()&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,key:commit_id,negate:!f,params:(query:'"+ data[j].sha + "',type:phrase),type:phrase,value:'" + data[j].sha + "'),query:(match:(commit_id:(query:'" + data[j].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:c18728c0-a156-11e8-8b91-cb4b4edefe7f,interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
            }
            pipelines[1] = data;
        });
        var commit_data = commits();
        commit_data.then(function(data) {
            last_update = calculate(data[0].created_at);
            for (k = 0; k < data.length; k++) {
                data[k].project_name = "v0.7-RC1";
                data[k].commit_url = "https://github.com/openebs/e2e-infrastructure/commit/" + data[k].id;
            }
            commits_data = data;
        });

        dashboard = { "dashboard" : { "pipelines": pipelines , "commits" : commits_data, "last_updated" : last_update, "cloud" : cloud }}; 
        app.get("/", function(req, res)  {
          res.json(dashboard);
        });
    },4000 );
}

app.listen(port, function() {
    console.log("server is listening on port:", port);
});
app.use(cors());
main();