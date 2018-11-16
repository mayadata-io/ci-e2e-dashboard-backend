module.exports = {
    kibana_log:function(sha, pipeline_id, data) {
        if (data.status == "success" || data.status == "failed" ) {
            started_at = data.jobs[0].started_at;
            finished_at = data.jobs[(data.jobs.length)-1].finished_at
            link = "https://e2elogs.openebs.ci/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:188',display:Off,pause:!f,section:0,value:0),time:(from:'"+ started_at +"',mode:absolute,to:'" + finished_at + "'))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + sha + "',type:phrase),type:phrase,value:'" + sha + "'),query:(match:(commit_id:(query:'" + sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ pipeline_id + "',type:phrase),type:phrase,value:'"+ pipeline_id + "'),query:(match:(pipeline_id:(query:'"+ pipeline_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))"
            return link;
        }
        else {
            link = "https://e2elogs.openebs.ci/app/kibana#/discover?_g=(refreshInterval:('$$hashKey':'object:2232',display:'10+seconds',pause:!f,section:1,value:10000),time:(from:now-3h,mode:quick,to:now))&_a=(columns:!(_source),filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:commit_id,negate:!f,params:(query:'" + sha + "',type:phrase),type:phrase,value:'" + sha + "'),query:(match:(commit_id:(query:'" + sha + "',type:phrase)))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',key:pipeline_id,negate:!f,params:(query:'"+ pipeline_id + "',type:phrase),type:phrase,value:'"+ pipeline_id + "'),query:(match:(pipeline_id:(query:'"+ pipeline_id + "',type:phrase))))),index:'215dd610-a155-11e8-8b91-cb4b4edefe7f',interval:auto,query:(language:lucene,query:''),sort:!('@timestamp',desc))";
            return link;
        }
    }
}