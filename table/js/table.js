$(document).ready(function () {
    $.getJSON("js/table.json", function (json) {
        var data = json.results;
       
        var datelist = []; // defaultlist
        var uniquedatelist = [];
        var l = [];
        var alluniquedatelist = [];
        var dates = [];
        var sortdate=[];


        for (var i = 0; i < data.length; i++) {

            var date = new Date(data[i].scheduledTimeIn);
            // console.log(data[i].scheduledTimeIn);

            var fulldate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
            datelist.push(fulldate);
            alluniquedatelist.push(data[i].scheduledTimeIn)


        }
        console.log(datelist);
        for (var h = 0; h < alluniquedatelist.sort().length; h++) {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var f = new Date(alluniquedatelist[h]);
            var date = f.toLocaleDateString("en-US", options);
            dates.push(date);

            // console.log();
            // console.log(f.toLocaleDateString('se'));


        }
        datelist.forEach(element => {
            if (!uniquedatelist.includes(element)) {
                uniquedatelist.push(element);
            }
        });
        dates.forEach(element => {
            if (!sortdate.includes(element)) {
                sortdate.push(element);
            }
        });
    
        var a = uniquedatelist.sort();
        // console.log(sortdate.length);
        // console.log(uniquedatelist);
    

     
        $('#first').html(`${a[0]}&nbsp;&nbsp;&nbsp;TO&nbsp;&nbsp;&nbsp;${uniquedatelist.slice(-1)}`);
       

            for (var s = 0; s < sortdate.length; s++) {
                $('#bodydata').append(`<div class="content"> <div class="container" id=''> <h2 class="mb-5" >${sortdate[s]}</h2><div class="table-responsive">
            <table class="table custom-table">  <thead class="table-success" ><tr><th id="time" scope="col">TIME</th><th scope="col">BOOKING</th><th scope="col">DURATION</th>
             </tr>   </thead>  <tbody id='tbodydata${s}'> </tbody></table> </div></div></div>`);

                for (var a = 0; a < data.length; a++) {
                    if (uniquedatelist[s] == new Date(data[a].scheduledTimeIn).getDate() + '-' + new Date(data[a].scheduledTimeIn).getMonth() + '-' + new Date(data[a].scheduledTimeIn).getFullYear()) {
                        var datas = data[a];
                        // console.log(datas.scheduledTimeIn);

                        var start = new Date(datas.scheduledTimeIn);
                        var end = new Date(datas.scheduledTimeOut);
                        // console.log(start);


                        var hrs = end.getHours() - start.getHours();

                        var min = end.getMinutes() - start.getMinutes();


                        var hour = 0;
                        var minutes = 0;
                        if (min < 0) {
                            min += 60;

                            hour += 1;
                        }
                        hrs = hrs - hour;


                        min = min - minutes;

                        var dict = {};

                        dict['date'] = sortdate[s];
                        dict['starttime'] = datas.scheduledTimeIn;
                        dict['endtime'] = datas.scheduledTimeOut;
                        dict['accessPointName'] = datas.accessPointName;
                        dict['resources'] = datas.resources;
                        dict['companyname'] = datas.companyName;

                        dict['hrs'] = hrs;
                        dict['min'] = min;
                        l.push(dict);








                    }

                }





            }


        l.sort(function (a, b) {
            return a.starttime.localeCompare(b.starttime);
        });

        var datas;

        for (var i = 0; i < uniquedatelist.sort().length; i++) {
            // console.log(new Date(uniquedatelist[i]) );
            for (var j = 0; j < l.length; j++) {
                if (uniquedatelist[i] == new Date(l[j].starttime).getDate() + '-' + new Date(l[j].starttime).getMonth() + '-' + new Date(l[j].starttime).getFullYear()) {
                    datas = l[j];
                    var intime = new Date(datas.starttime).getHours() + ":" + new Date(datas.starttime).getMinutes();
                    var outtime = new Date(datas.endtime).getHours() + ":" + new Date(datas.endtime).getMinutes();
                    if (datas.resources == null) {
                        $("#tbodydata" + i).append(`<tr><td><font style="font-size:18px;"><b>${intime}</b></font>&nbsp;&nbsp;--&nbsp;&nbsp;
                        <font style="font-size:18px;"><b>${outtime}</b></font></td><td >
                        <a href="#" style="font-size:18px;">${datas.accessPointName}
                        &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;No Resources Available</a><small class="d-block" style="color:black; font-size:14px;">
                        ${datas.companyname}</small></td>
                        <td ><font style="font-size:18px;"><b>${datas.hrs}</b></font>&nbsp;Hours&nbsp;&nbsp;<font style="font-size:18px;">
                        <b>${datas.min}</b><font>&nbsp;&nbsp;Minutes</td></tr>`);
                    }
                    else {
                        $("#tbodydata" +i).append(`<tr><td><font style="font-size:18px;"><b>${intime}</b></font>&nbsp;&nbsp;--&nbsp;&nbsp;
                        <font style="font-size:18px;"><b>${outtime}</b></font></td><td ><a href="#" >${datas.accessPointName}&nbsp;&nbsp;-&nbsp;&nbsp;
                        ${datas.resources}</a>
                        <small class="d-block" style="color:black; font-size:17px;">${datas.companyname}</small></td>
                        <td ><font style="font-size:18px;"><b>${datas.hrs}</b></font>&nbsp;Hours&nbsp;&nbsp;<font style="font-size:18px;">
                        <b>${datas.min}</b><font>&nbsp;&nbsp;Minutes</td></tr>`);

                    }
                }

            }
        }
       





    });
});

