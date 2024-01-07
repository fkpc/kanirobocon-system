const endpoint = "./api/kanirobocon/";

export const api = async (path) => {
  return await (await fetch(endpoint + path)).json();
};

const enc = (s) => encodeURIComponent(s);

const parseCSV = (data) => {
  if (!data) {
    return [];
  }
  const ss = data.split('\n');
  const csv = [];
  for (let i = 0; i < ss.length; i++) {
    if (ss[i].length > 0) {
      const s = ss[i].split(',');
      csv.push(s);
    }
  }
  return csv
};

export class MiniDB {
  static async load(name) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=load&key=" + enc(key);
    const data = await api(url);
    return parseCSV(data);
  }
  static async create(name, header) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=create&key=" + enc(key) + "&data=" + enc(header);
    console.log("create", url)
    await api(url);
  }
  static async add(name, data) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=add&key=" + enc(key) + "&data=" + enc(data);
    await apip(url);
  }
  static async set(name, data) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=set&key=" + enc(key) + "&data=" + enc(data);
    return await api(url);
  }
  static async get(name, id) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=get&key=" + enc(key) + "&id=" + enc(id);
    const data = await api(url);
    if (!data) {
      return callback([]);
    }
    const ss = data.split(',');
    return ss;
  }
  static async remove(name, id) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=remove&key=" + enc(key) + "&id=" + enc(id);
    await api(url);
  }
  static async head(name) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=head&key=" + enc(key);
    const data = await api(url);
    const ss = data.split(',');
    return ss;
  }
  static async del(name) {
    const key = localStorage.getItem("key");
    const url = name + ".csv?cmd=delete&key=" + enc(key);
    await api(url);
  }
  static serialize(array) {
    let s = "";
    for (let i = 0; i < array.length; i++) {
      s += array[i].join(",") + "\n";
    }
    return encodeURIComponent(s);
  }
}
