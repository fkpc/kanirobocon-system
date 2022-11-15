import { CSV } from "https://js.sabae.cc/CSV.js";

export const minidb = async (fn, cmd, param) => {
  if (cmd == "load") {
    try {
      return await Deno.readTextFile(fn);
    } catch (e) {
    }
    return null;
  } else if (cmd == "get") {
    const id = param.id;
    const csv = await CSV.fetch(fn);
    for (let i = 1; i < csv.length; i++) {
      if (csv[i][0] == id) {
        return csv[i].join(",");
      }
    }
    return id.toString();
  } else if (cmd == "set") {
    const ss = param.data.split(",");
    const id = param.id || ss[0];
    console.log("set", id, fn, param)
    const csv = await CSV.fetch(fn);
    for (let i = 1; i < csv.length; i++) {
      if (csv[i][0] == id) {
        csv[i] = ss;
        await Deno.writeTextFile(fn, CSV.encode(csv));
        return 1;
      }
    }
    csv.push(ss);
    await Deno.writeTextFile(fn, CSV.encode(csv));
    return 1;
  } else if (cmd == "remove") {
    const id = param.id || ss[0];
    console.log("remove", id, fn, param)
    const csv = await CSV.fetch(fn);
    for (let i = 1; i < csv.length; i++) {
      if (csv[i][0] == id) {
        csv.splice(i, 1);
        await Deno.writeTextFile(fn, CSV.encode(csv));
        return 1;
      }
    }
    return 1;
  } else if (cmd == "delete") {
    try {
      await Deno.remove(fn);
      return 1;
    } catch (e) {
    }
    return 0;
  } else if (cmd == "create") {
    await Deno.writeTextFile(fn, param.data);
    return 1;
  }
  return null;
};
