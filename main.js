require("moment-duration-format");
var port = process.env.PORT || 3000;
var express = require("express"); 
var app = express();
var cors = require('cors');
var aws = require('./src/aws');
var eks = require('./src/eks');
var gcp = require('./src/gcp');
var aks = require('./src/aks');
var packet = require('./src/packet');
var gke = require('./src/gke');
var time = require('./src/time-calculate');
var log_link = require('./src/kibana_log');
var build = require('./src/build');
var dashboard = [], pipelines = [] , commits_data = [], aws_job = [], gcp_job = [], azure_job = [], packet_job = [], gke_job = [], eks_job = [], temp = [], builddata = [], cstor_job = [], maya_job = [], jiva_job = [];

var cloud = [{"cloud_id":1,"cloud_name":"GKE"},{"cloud_id":2,"cloud_name":"AKS"},{"cloud_id":3,"cloud_name":"EKS"},{"cloud_id":4,"cloud_name":"Packet"},{"cloud_id":5,"cloud_name":"GCP"},{"cloud_id":6,"cloud_name":"AWS"}];
var json ={"id": "n/a","sha": "n/a","ref": "n/a","status": "pending","web_url": "n/a"};
function main() {
    // ------------  GKE data Start  ------------------------
    gke.gke_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            data[i].cloud_id = 1;
            var k = 0;
            if (gke_job != "" && gke_job[k] != undefined) {
                while(gke_job[k][0].pipeline.id !== p_id) {
                    k++;
                    if(gke_job[k] == undefined) {
                        break;
                    }
                }
                if(gke_job[k] != undefined && gke_job[k][0].pipeline.id == p_id) {
                    data[i].jobs = gke_job[k];
                    k = 0;
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[0] = data;
    }).catch(function (err) {
        console.log("gke pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[0] != undefined) {
            for(var p = 0; p < pipelines[0].length; p++) {
                gke.gke_jobs(pipelines[0][p].id).then(function(data) {
                    gke_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("gke jobs error ->",err);
    });
// ------------  GKE data End  ------------------------

// ------------  AKS data Start  ------------------------
    aks.aks_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            data[i].cloud_id = 2;
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
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[1] = data;
    }).catch(function (err) {
        console.log("azure pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[1] != undefined) {
            for(var p = 0; p < pipelines[1].length; p++) {
                aks.aks_jobs(pipelines[1][p].id).then(function(data) {
                    azure_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("azure jobs error ->",err);
    });
// ------------  AKS data End  ------------------------

// ------------  EKS data End  ------------------------
    eks.eks_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            data[i].cloud_id = 3;
            var k = 0;
            if (eks_job != "" && eks_job[k] != undefined) {
                while(eks_job[k][0].pipeline.id !== p_id) {
                    k++;
                    if(eks_job[k] == undefined) {
                        break;
                    }
                }
                if(eks_job[k] != undefined && eks_job[k][0].pipeline.id == p_id) {
                    data[i].jobs = eks_job[k];
                    k = 0;
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[2] = data;
    }).catch(function (err) {
        console.log("eks pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[2] != undefined) {
            for(var p = 0; p < pipelines[2].length; p++) {
                eks.eks_jobs(pipelines[2][p].id).then(function(data) {
                    eks_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("eks jobs error ->",err);
    });
// ------------  AKS data End  ------------------------

// ------------  Packet data Start  ------------------------
    packet.packet_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            data[i].cloud_id = 4;
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
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[3] = data;
    }).catch(function (err) {
        console.log("packet pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[3] != undefined) {
            for(var p = 0; p < pipelines[3].length; p++) {
                packet.packet_jobs(pipelines[3][p].id).then(function(data) {
                    packet_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("packet jobs error ->",err);
    });
// ------------  Packet data End  ------------------------

// ------------  GCP data Start  ------------------------
    gcp.gcp_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var j = 0; j < data.length; j++) {
            var p_id = data[j].id;
            data[j].cloud_id = 5;
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
                    data[j].log_link = log_link.kibana_log(data[j].sha, p_id, data[j]);
                }
            }
        }
        pipelines[4] = data;
    }).catch(function (err) {
        console.log("gcp pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[4] != undefined) {
            for(var p = 0; p < pipelines[4].length; p++) {
                gcp.gcp_jobs(pipelines[4][p].id).then(function(data) {
                    gcp_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("gcp jobs error ->",err);
    });
// ------------  GCP data End  ------------------------

// ------------  AWS data Start  ------------------------
    aws.aws_pipeline().then(function(data) {
        if(temp != null) {
            for(var j = 0; j < temp.length; j++) {
                if (temp[j].jobs != undefined) {
                    if(temp[j].jobs[1].status == "running" || temp[j].jobs[1].status == "pending" || temp[j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            data[i].cloud_id = 6;
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
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[5] = data;
    }).catch(function (err) {
        console.log("aws pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[5] != undefined) {
            for(var p = 0; p < pipelines[5].length; p++) {
                aws.aws_jobs(pipelines[5][p].id).then(function(data) {
                    aws_job[index] = data;
                    index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("aws jobs error ->",err);
    });
// ------------  AWS data End  ------------------------

// ------------ build data ---------------------------

// ----------------- build cstor ------------------------
// build.cstor_pipeline().then(function(data) {
//     for (var i = 0; i < data.length; i++) {
//         data[i].name = "cstor";
//         var p_id = data[i].id;
//         var k = 0;
//         if (cstor_job != "" && cstor_job[k] != undefined) {
//             while(cstor_job[k][0].pipeline.id !== p_id) {
//                 k++;
//                 if(cstor_job[k] == undefined) {
//                     break;
//                 }
//             }
//             if(cstor_job[k] != undefined && cstor_job[k][0].pipeline.id == p_id) {
//                 data[i].jobs = cstor_job[k];
//                 k = 0;
//             }
//         }

//     }
//     builddata[0] = data;
// }).catch(function (err) {
//     console.log("cstor build pipeline error ->",err);
// }).then(function() {
//     var index = 0;
//     if (builddata[0] != undefined) {
//         for(var p = 0; p < builddata[0].length; p++) {
//             build.cstor_jobs(builddata[0][p].id).then(function(data) {
//                 cstor_job[index] = data;
//                 index++;
//             });
//         }
//     }
// }).catch(function (err) {
//     console.log("cstor build pipeline jobs error ->",err);
// });

// ------------------------- build maya ------------------------------
build.maya_pipeline().then(function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].name = "maya";
        data[i].commit_url = "https://github.com/openebs/maya/commit/"+data[i].sha;
        var p_id = data[i].id;
        var k = 0;
        if (maya_job != "" && maya_job[k] != undefined) {
            while(maya_job[k][0].pipeline.id !== p_id) {
                k++;
                if(maya_job[k] == undefined) {
                    break;
                }
            }
            if(maya_job[k] != undefined && maya_job[k][0].pipeline.id == p_id) {
                data[i].jobs = maya_job[k];
                // data[i].updated = time.calculate(maya_job[0]);
                k = 0;
            }
        }

    }
    // if (builddata[0] != undefined) {
        // builddata[1] = data.concat(builddata[0]);
        builddata[0] = data;
    // }
}).catch(function (err) {
    console.log("maya build pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (builddata[0] != undefined) {
        for(var p = 0; p < builddata[0].length; p++) {
            build.maya_jobs(builddata[0][p].id).then(function(data) {
                data[0]['updated'] = time.calculate(data[0]);
                maya_job[index] = data;
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("maya build pipeline jobs error ->",err);
});

// ------------------------------ build jiva ---------------------------
build.jiva_pipeline().then(function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].name = "jiva";
        data[i].commit_url = "https://github.com/openebs/jiva/commit/"+data[i].sha;
        var p_id = data[i].id;
        var k = 0;
        if (jiva_job != "" && jiva_job[k] != undefined) {
            while(jiva_job[k][0].pipeline.id !== p_id) {
                k++;
                if(jiva_job[k] == undefined) {
                    break;
                }
            }
            if(jiva_job[k] != undefined && jiva_job[k][0].pipeline.id == p_id) {
                data[i].jobs = jiva_job[k];
                // data[i].updated = time.calculate(jiva_job[0]);
                k = 0;
            }
        }

    }
    if (builddata[0] != undefined) {
        temp = builddata[0].concat(data);
        builddata[1] = data;
    } 
}).catch(function (err) {
    console.log("jiva build pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (builddata[1] != undefined) {
        for(var p = 0; p < builddata[1].length; p++) {
            build.jiva_jobs(builddata[1][p].id).then(function(data) {
                data[0]['updated'] = time.calculate(data[0]);
                // time.calculate(data[0]);
                jiva_job[index] = data;
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("jiva build pipeline jobs error ->",err);
});
//  Sorting data by their id
if (temp != undefined) {
    temp.sort(sort_by('id', true, parseInt));
    function sort_by(field, reverse, primer) {
        var key = primer ? 
            function(x) {return primer(x[field])} : 
            function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    }
}
// for (var i = 0; i < 20; i++) {
//     data2[i] = data[i]
// }
//sorting end

// ------------  Build data End  ------------------------
    dashboard = { "dashboard" : { "pipelines": pipelines , "build": temp, "cloud" : cloud }}; 
    app.get("/", function(req, res)  {
        res.json(dashboard);
    });
}
app.use(cors());
main();

setInterval(function() {
    main();
},60000 );

app.listen(port, function() {
    console.log("server is listening on port:", port);
});