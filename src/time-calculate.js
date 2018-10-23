var moment = require('moment');
var dateFormat = require('dateformat');

module.exports = {
    calculate:function(t1)
    {   
        var t3 = [];
        t1 = t1.commit.created_at;
        var t2 = dateFormat((new Date()), "UTC:yyyy-mm-dd'T'HH:MM:ss'.000Z'");
        t2 = moment(t2, 'YYYY-M-DD,HH:mm:ss');
        t1 = moment(t1, 'YYYY-M-DD,HH:mm:ss');
        t3 = moment.duration((t2.diff(t1, 'second')), "seconds").format("d[d] h[h] m[m]");
        return t3;
    }
};