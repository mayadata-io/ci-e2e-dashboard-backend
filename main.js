require("moment-duration-format");
var port = process.env.PORT || 3000;
var express = require("express"); 
var app = express();
var cors = require('cors');
var packet = require('./src/packet');
var time = require('./src/time-calculate');
var log_link = require('./src/kibana_log');
var build = require('./src/build');
var dashboard = [], pipelines = [], packet_job_v11 = [], packet_job_v12 = [], packet_job_v13 = [], builddata = [], istgt_job = [], zfs_job = [], maya_job = [], jiva_job = [], build_data_temp = [];

var json ={"id": "dummy_id","sha": "dummy_commit_sha","ref": "dummy","status": "pending","web_url": "dummy json"};
function main() {
    // ------------  PACKET data Start  ------------------------
    packet.packet_pipeline("k8s-1-11").then(function(data) {
        if(builddata[0] != null) {
            for(var j = 0; j < builddata[0].length; j++) {
                if(builddata[0][j].jobs != undefined) {
                    if(builddata[0][j].jobs[1].status == "running" || builddata[0][j].jobs[1].status == "pending" || builddata[0][j].jobs[1].status == "created") {
                        data.unshift(json)
                    }
                }
            }
        }
        for (var i = 0; i < data.length; i++) {
            var p_id = data[i].id;
            var k = 0;
            if (packet_job_v11 != "" && packet_job_v11[k] != undefined) {
                while(packet_job_v11[k][0].pipeline.id !== p_id) {
                    k++;
                    if(packet_job_v11[k] == undefined) {
                        break;
                    }
                }
                if(packet_job_v11[k] != undefined && packet_job_v11[k][0].pipeline.id == p_id) {
                    data[i].jobs = packet_job_v11[k];
                    k = 0;
                    data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
                }
            }
        }
        pipelines[0] = data;
    }).catch(function (err) {
        console.log("packet pipeline error ->",err);
    }).then(function() {
        var index = 0;
        if (pipelines[0] != undefined) {
            for(var p = 0; p < pipelines[0].length; p++) {
                packet.packet_jobs(pipelines[0][p].id).then(function(data) {
                if (data != "") {
                    packet_job_v11[index] = data;
                }
                index++;
                });
            }
        }
    }).catch(function (err) {
        console.log("packet jobs error ->",err);
    });
// ------------  PACKET data End  ------------------------
// ------------  PACKET data Start  ------------------------
packet.packet_pipeline("k8s-1-12").then(function(data) {
    if(builddata[0] != null) {
        for(var j = 0; j < builddata[0].length; j++) {
            if(builddata[0][j].jobs != undefined) {
                if(builddata[0][j].jobs[1].status == "running" || builddata[0][j].jobs[1].status == "pending" || builddata[0][j].jobs[1].status == "created") {
                    data.unshift(json)
                }
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        var p_id = data[i].id
        var k = 0;
        if (packet_job_v12 != "" && packet_job_v12[k] != undefined) {
            while(packet_job_v12[k][0].pipeline.id !== p_id) {
                k++;
                if(packet_job_v12[k] == undefined) {
                    break;
                }
            }
            if(packet_job_v12[k] != undefined && packet_job_v12[k][0].pipeline.id == p_id) {
                data[i].jobs = packet_job_v12[k];
                k = 0;
                data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
            }
        }
    }
    pipelines[1] = data;
}).catch(function (err) {
    console.log("packet pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (pipelines[1] != undefined) {
        for(var p = 0; p < pipelines[1].length; p++) {
            packet.packet_jobs(pipelines[1][p].id).then(function(data) {
                if (data != "") {
                    packet_job_v12[index] = data;
                }
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("packet jobs error ->",err);
});
// ------------  PACKET data End  ------------------------
// ------------  PACKET data Start  ------------------------
packet.packet_pipeline("k8s-1-13").then(function(data) {
    if(builddata[0] != null) {
        for(var j = 0; j < builddata[0].length; j++) {
            if(builddata[0][j].jobs != undefined) {
                if(builddata[0][j].jobs[1].status == "running" || builddata[0][j].jobs[1].status == "pending" || builddata[0][j].jobs[1].status == "created") {
                    data.unshift(json)
                }
            }
        }
    }
    for (var i = 0; i < data.length; i++) {
        var p_id = data[i].id
        var k = 0;
        if (packet_job_v13 != "" && packet_job_v13[k] != undefined) {
            while(packet_job_v13[k][0].pipeline.id !== p_id) {
                k++;
                if(packet_job_v13[k] == undefined) {
                    break;
                }
            }
            if(packet_job_v13[k] != undefined && packet_job_v13[k][0].pipeline.id == p_id) {
                data[i].jobs = packet_job_v13[k];
                k = 0;
                data[i].log_link = log_link.kibana_log(data[i].sha, p_id, data[i]);
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
                if (data != "") {
                    packet_job_v13[index] = data;
                }
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("packet jobs error ->",err);
});
// ------------  PACKET data End  ------------------------

// ------------ build data ---------------------------
// build maya
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
                k = 0;
            }
        }

    }
    builddata[0] = data;
    // build_data_temp[0] = data;
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
                k = 0;
            }
        }
    }
    // if (builddata[0] != undefined) {
    //     builddata[0] = builddata[0].concat(data);
        // console.log(builddata[0])
        builddata[1] = data;
    // } 
}).catch(function (err) {
    console.log("jiva build pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (builddata[1] != undefined) {
        for(var p = 0; p < builddata[1].length; p++) {
            build.jiva_jobs(builddata[1][p].id).then(function(data) {
                data[0]['updated'] = time.calculate(data[0]);
                jiva_job[index] = data;
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("jiva build pipeline jobs error ->",err);
});
// ------------------------------ build zfs ---------------------------
build.zfs_pipeline().then(function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].name = "cStor";
        data[i].commit_url = "https://github.com/openebs/zfs/commit/"+data[i].sha;
        var p_id = data[i].id;
        var k = 0;
        if (zfs_job != "" && zfs_job[k] != undefined) {
            while(zfs_job[k][0].pipeline.id !== p_id) {
                k++;
                if(zfs_job[k] == undefined) {
                    break;
                }
            }
            if(zfs_job[k] != undefined && zfs_job[k][0].pipeline.id == p_id) {
                data[i].jobs = zfs_job[k];
                k = 0;
            }
        }
    }
    // if (builddata[0] != undefined) {
    //     builddata[0] = builddata[0].concat(data);
        builddata[2] = data;
    // } 
}).catch(function (err) {
    console.log("zfs build pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (builddata[2] != undefined) {
        for(var p = 0; p < builddata[2].length; p++) {
            build.zfs_jobs(builddata[2][p].id).then(function(data) {
                data[0]['updated'] = time.calculate(data[0]);
                zfs_job[index] = data;
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("zfs build pipeline jobs error ->",err);
});

// ------------------------------ build istgt ---------------------------
build.istgt_pipeline().then(function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i].name = "istgt";
        data[i].commit_url = "https://github.com/openebs/istgt/commit/"+data[i].sha;
        var p_id = data[i].id;
        var k = 0;
        if (istgt_job != "" && istgt_job[k] != undefined) {
            while(istgt_job[k][0].pipeline.id !== p_id) {
                k++;
                if(istgt_job[k] == undefined) {
                    break;
                }
            }
            if(istgt_job[k] != undefined && istgt_job[k][0].pipeline.id == p_id) {
                data[i].jobs = istgt_job[k];
                k = 0;
            }
        }
    }
    builddata[3] = data;
    if (builddata[0] != undefined && builddata[1] != undefined && builddata[2] != undefined && builddata[3] != undefined) {
        build_data_temp[0] = builddata[0].concat(builddata[1], builddata[2], builddata[3]);
    } 
}).catch(function (err) {
    console.log("istgt build pipeline error ->",err);
}).then(function() {
    var index = 0;
    if (builddata[3] != undefined) {
        for(var p = 0; p < builddata[3].length; p++) {
            build.istgt_jobs(builddata[3][p].id).then(function(data) {
                data[0]['updated'] = time.calculate(data[0]);
                istgt_job[index] = data;
                index++;
            });
        }
    }
}).catch(function (err) {
    console.log("istgt build pipeline jobs error ->",err);
});
//  Sorting data by their id
if (build_data_temp[0] != undefined) {
    build_data_temp[0].sort(sort_by('id', true, parseInt));
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
    dashboard = { "dashboard" : { "pipelines": pipelines , "build": build_data_temp[0] }}; 
    app.get("/", function(req, res)  {
        res.json(dashboard);
    });
}
app.use(cors());
main();

setInterval(function() {
    main();
},30000 );

app.listen(port, function() {
    console.log("server is listening on port:", port);
});