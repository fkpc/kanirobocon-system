const enc = (s) => encodeURIComponent(s);

var MiniDB = {
	endpoint: "./api/kanirobocon/",
	//endpoint: "https://fukuno.jig.jp/minidb/kanirobo2021/",
	//endpoint: "http://172.20.10.4:8888/minidb/kanirobo2020/",
//	endpoint: "http://localhost:8888/minidb/kanirobo2020/",
//	endpoint: "https://sabae.cc/minidb/kanirobo2019/",
//	endpoint: "http://sabae.cc/minidb/kanirobo2018/",
	load: function(name, callback) {
		var key = localStorage.getItem("key")
		var url = this.endpoint + name + ".csv?cmd=load&key=" + enc(key)
		var self = this
		jsonp(url + "&callback=" + getCallbackMethod(function(data) {
			callback(self.parseCSV(data));
		}))
	},
	parseCSV: function(data) {
		if (!data) {
			return [];
		}
		var ss = data.split('\n');
		var csv = [];
		for (var i = 0; i < ss.length; i++) {
			if (ss[i].length > 0) {
				var s = ss[i].split(',');
				csv.push(s);
			}
		}
		return csv
	},
	create: function(name, header, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=create&key=" + enc(key) + "&data=" + enc(header);
		console.log("create", url)
		jsonp(url + "&callback=" + getCallbackMethod(callback));
	},
	add: function(name, data, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=add&key=" + enc(key) + "&data=" + enc(data);
		jsonp(url + "&callback=" + getCallbackMethod(callback));
	},
	set: function(name, data, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=set&key=" + enc(key) + "&data=" + enc(data);
		jsonp(url + "&callback=" + getCallbackMethod(callback));
	},
	get: function(name, id, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=get&key=" + enc(key) + "&id=" + enc(id);
		jsonp(url + "&callback=" + getCallbackMethod(function(data) {
			if (!data) {
				return callback([]);
			}
			var ss = data.split(',');
			callback(ss);
		}));
	},
	remove: function(name, id, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=remove&key=" + enc(key) + "&id=" + enc(id);
		jsonp(url + "&callback=" + getCallbackMethod(callback));
	},
	head: function(name, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=head&key=" + enc(key);
		jsonp(url + "&callback=" + getCallbackMethod(function(data) {
			var ss = data.split(',');
			callback(ss);
		}));
	},
	del: function(name, callback) {
		var key = localStorage.getItem("key");
		var url = this.endpoint + name + ".csv?cmd=delete&key=" + enc(key);
		jsonp(url + "&callback=" + getCallbackMethod(callback));
	},
	serialize: function(array) {
		var s = "";
		for (var i = 0; i < array.length; i++) {
			s += array[i].join(",") + "\n";
		}
		return encodeURIComponent(s);
	},
};
