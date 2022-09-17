import { createServer, Model } from "miragejs";

const textLimit = 60;

export function makeServer() {
  createServer({
    models: {
      note: Model,
    },
    seeds(server) {
      let jam = server.create("note", {
        title: "Intro",
        text: "Hello I am Jamshaid",
      });
      server.create("note", { title: "Test", text: "Hello I am Jamshaid" });
    },
    routes() {
      this.namespace = "mirage";
      this.get("/getallnotes", (schema, req) => {
        // const limit = Number(req.queryParams.limit);
        // const str = this.schema.notes.all().models[0].attrs;
        return getAllNotes(this.schema, textLimit);
      });
      this.post("/createnote", (schema, req) => {
        let post = this.schema.notes.create(JSON.parse(req.requestBody));
        console.log("inside mirage");
        console.log(this.schema.notes.all());
        return { id: post.id, notes: getAllNotes(this.schema, textLimit) };
      });
      this.get("notes/:id");
      this.post("/updatenote", (schema, req) => {
        let request = JSON.parse(req.requestBody);
        console.log("[server]insdie updateNote ", request);
        let note = schema.notes.find(request.id);
        console.log("[server]insdie note ", note);
        console.log("[server]insdie notes ", schema.notes.all());
        if (note) {
          note.update({ text: request.text, title: request.title });
          return { id: request.id, notes: getAllNotes(this.schema, textLimit) };
        } else {
          note = schema.notes.create({
            text: request.text,
            title: request.title,
          });
          return { id: note.id, notes: getAllNotes(this.schema, textLimit) };
        }
      });
      this.get("notes/delete/:id", (schema, req) => {
        schema.notes.find(req.params.id).destroy();
        return getAllNotes(this.schema, textLimit);
      });
    },
  });
}

function getAllNotes(schema, limit) {
  return schema.notes.all().models.map((user) => {
    console.log("inside getAll Notes func", user);
    return { ...user.attrs, text: user.attrs.text.slice(0, limit) };
  });
}
