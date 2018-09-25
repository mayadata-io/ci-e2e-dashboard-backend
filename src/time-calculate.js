var moment = require('moment');
var dateFormat = require('dateformat');

module.exports = {
    calculate:function(t1)
    {
        var t2 = dateFormat((new Date()), "UTC:yyyy-mm-dd,HH:MM:ss");
        t2 = moment(t2, 'YYYY-M-DD,HH:mm:ss');
        t1 = moment(t1, 'YYYY-M-DD,HH:mm:ss');
        t1 = moment.duration((t2.diff(t1, 'second')), "seconds").format("h [Hours] m [minutes]");
        return t1;
    }
};