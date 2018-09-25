require("moment-duration-format");
var port = process.env.PORT || 3000;
var express = require("express"); 
var app = express();
var cors = require('cors');
var aws = require('./src/aws');
var gcp = require('./src/gcp');
var commit = require('./src/commit');
var azure = require('./src/azure');
var packet = require('./src/packet');
var time = require('./src/time-calculate');
var dashboard = [], pipelines = [] , commits_data = [], last_update, aws_job = [], gcp_job = [], azure_job = [], packet_job = [];

var cloud = [{"cloud_id":1,"cloud_name":"aws"},{"cloud_id":2,"cloud_name":"gce"},{"cloud_id":4,"cloud_name":"azure"}];

function main() {
    setInterval(function() {
        aws.aws_pipeline().then(function(data) {
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
                    aws.aws_jobs(pipelines[0][p].id).then(function(data) {
                        aws_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("aws jobs error ->",err);
        });
        gcp.gcp_pipeline().then(function(data) {
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
                    gcp.gcp_jobs(pipelines[1][p].id).then(function(data) {
                        gcp_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("gcp jobs error ->",err);
        });
        azure.azure_pipeline().then(function(data) {
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
                    azure.azure_jobs(pipelines[3][p].id).then(function(data) {
                        azure_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("azure jobs error ->",err);
        });
        packet.packet_pipeline().then(function(data) {
            for (var i = 0; i < data.length; i++) {
                var p_id = data[i].id;
                data[i].cloud_id = 4;
                data[i].log_link = "https://e2elogs.test.openebs.io/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:2232',display:'10+seconds',pause:!f,section:1,value:10000),time:(from:now-1h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + data[i].sha + "',type:phrase),type:phrase,value:'" + data[i].sha + "'),query:(match:(commit_id:(query:'" + data[i].sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ p_id + "',type:phrase),type:phrase,value:'"+ p_id + "'),query:(match:(pipeline_id:(query:'"+ p_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
                var k = 0;
                if (packet_job != "" && packet_job[k] != undefined) {
                    while(packet_job[k][0].pipeline.id !== p_id) {
                        k++;
                        if(packet_job[k] == undefined) {
                            break;
                        }
                    }
                    if(packet_job[k] != undefined && packet_job[k][0].pipeline.id == p_id) {
                        data[i].jobs = packet_job[k];
                        k = 0;
                    }
                }
            }
            pipelines[2] = data;
        }).catch(function (err) {
            console.log("packet pipeline error ->",err);
        }).then(function() {
            var index = 0;
            if (pipelines[2] != undefined) {
                for(var p = 0; p < pipelines[2].length; p++) {
                    packet.packet_jobs(pipelines[2][p].id).then(function(data) {
                        packet_job[index] = data;
                        index++;
                    });
                }
            }
        }).catch(function (err) {
            console.log("packet jobs error ->",err);
        });
        commit.commits().then(function(data) {
            last_update = time.calculate(data[0].created_at);
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
    },5000 );
}
app.listen(port, function() {
    console.log("server is listening on port:", port);
});
app.use(cors());
main();