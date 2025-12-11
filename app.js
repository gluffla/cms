import express from "express";
import { getConnection } from "./db.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", "./views");

// Простейший роут для проверки сервера
app.get("/", (req, res) => {
  res.send("Сервер работает!");
});

// Роут для страницы авторизации
app.get("/login", (req, res) => {
  res.render("login");
});

// Роут для обработки формы авторизации
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Логин:", username);
  console.log("Пароль:", password);

  const connection = await getConnection();
  try {
    const [rows] = await connection.query(
      "SELECT * FROM user WHERE username=? AND password=?",
      [username, password]
    );

    if (rows.length > 0) {
      // Успех — возвращаем сообщение на форму
      res.render("login", { message: "Авторизация успешна!" });
    } else {
      // Ошибка — возвращаем сообщение на форму
      res.render("login", { message: "Неверный логин или пароль" });
    }
  } catch (err) {
    console.error(err);
    res.render("login", { message: "Ошибка сервера" });
  } finally {
    await connection.end();
  }
});
app.listen(3000, () => {
  console.log("Сервер запущен на http://localhost:3000");
});
