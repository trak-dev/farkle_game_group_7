import { Express } from "express";

export default (app: Express) => {
  app.get("/users", (req, res) => {
    res.send("Hello Users!");
  });
}