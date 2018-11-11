
function num_data(start_date, end_date) {
    var start_date = new Date(start_date.replace(/-/g, "/"));
    var end_date = new Date(end_date.replace(/-/g, "/"));
    var days = end_date.getTime() - start_date.getTime();
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    return day
}

function getDealing(){
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    // return currentdate;

    return num_data(currentdate, "2018-12-11")
}

module.exports = {
    getDealing: getDealing
}
