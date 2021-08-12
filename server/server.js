import express from "express";

const app = express();
const PORT = 3000;
i/
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log("Ket noi thanh cong "+ PORT);
});