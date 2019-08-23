print("username,timestamp,day,day_protocol,session,ex_id,ex_type,complete,ex_title,ex_set,ex_rep,data");
db.progresses.find().forEach(function(user) { 
    var username = user.username; 
    user.progress.forEach(function(entry) {   
        if (entry.data) {
		print(username + "," + entry.timestamp +","+ entry.day + "," + entry.day_protocol + "," + entry.session + "," + entry.ex_id + "," + entry.ex_type + "," + entry.complete + ",\"" + entry.ex_title + "\"," + entry.ex_set + "," + entry.ex_rep + "," + entry.data); 
	} else {
		print(username + "," + entry.timestamp +","+ entry.day + "," + entry.day_protocol + "," + entry.session + "," + entry.ex_id + "," + entry.ex_type + "," + entry.complete + ",\"" + entry.ex_title + "\"," + entry.ex_set + "," + entry.ex_rep + ",N/A" ); 
	}
    });
});
