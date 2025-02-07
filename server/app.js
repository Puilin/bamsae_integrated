﻿const express = require("express")
const mysql = require("mysql")
const app = express()
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const expressValidator = require("express-validator")
const flash = require("express-flash")
const session = require("express-session")
const bodyParser = require("body-parser")

const cors = require("cors")
app.use(cors({origin:true, credentials:true}))

// .env에서 db 서버 credential 가져오기
require("dotenv").config()

const db_host = process.env.db_host
const db_user = process.env.db_user
const db_password = process.env.db_password
const db_database = process.env.db_database
const db_port = process.env.db_port
const port = 5000

// DB Connection 생성
const db = mysql.createConnection({
  connectionlimit: 100,
  host: db_host,
  user: db_user,
  password: db_password,
  database: db_database,
  port: db_port,
  multipleStatements: true,
})

// DB 연동
db.connect(function (err) {
  if (err) throw err
  console.log("DB connected successful")
})

module.exports = db

// ejs 설정
app.set("views", path.join(__dirname, "./views"))
app.set("view engine", "ejs")

// 미들웨어
app.use(logger("dev"))
// app.use(expressValidator())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(
  session({
    secret: "1234",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  })
)
app.use(flash())
// app.use(expressValidator())
app.use("/node_modules", express.static(path.join(__dirname + "/node_modules")))

// Router 연결
const movieSearch = require("./router/movieSearch")
const store = require("./router/store")
const movie = require("./router/movie")
const theater = require("./router/theater")
const movieHistory = require("./router/movieHistory")
const fastTicket = require("./router/fastTicket")
const memberWish = require("./router/memberWish")
const kakaoPay = require("./router/kakaopay")
const paySuccess = require("./router/paySuccess")
const payFail = require("./router/payFail")
const result = require("./router/result")
const companyEmpInfo = require("./router/companyEmpInfo")
const companyEmpSalary = require("./router/companyEmpSalary")
const companyEmpDil = require("./router/companyEmpDil")
const companyIncome = require("./router/companyIncome")
const companyStastics = require("./router/companyStastics")
const movieReservation = require("./router/movieReservation")
const memberPoint = require("./router/memberPoint")

const question = require("./router/question")
const platform = require("./router/platform")

const memberView = require("./router/memberView.js")
const memReview = require("./router/memReview.js")

const main = require("./router/main.js")
const memLogin = require("./router/memLogin.js")
const memJoin = require("./router/memJoin.js")
const memFind = require("./router/memFind.js")
const theaterManage = require("./router/theaterManage.js")
const theaterSales = require("./router/theaterSales.js")
const theaterPost = require("./router/theaterPost.js")
const theaterStock = require("./router/theaterStock.js")
const theaterEmp = require("./router/theaterEmp.js")
const theaterDil = require("./router/theaterEmpDil.js")
const theaterSalary = require("./router/theaterSalary.js")
const theaterSchedule = require("./router/theaterSchedule.js")
const memBoard = require("./router/memBoard.js")
const memInfo = require("./router/memInfo.js")
const movieTicketing = require("./router/movieTicketing.js")

app.use("/memLogin", memLogin)
app.use("/movieSearch", movieSearch)
app.use("/store", store)
app.use("/movie", movie)
app.use("/theater", theater)

app.use("/movieHistory", movieHistory)
app.use("/fastTicket", fastTicket)
app.use("/memberWish", memberWish)
app.use("/kakaoPay", kakaoPay)
app.use("/paySuccess", paySuccess)
app.use("/payFail", payFail)
app.use("/result", result)
app.use("/emp/info", companyEmpInfo)
app.use("/emp/salary", companyEmpSalary)
app.use("/emp/diligence", companyEmpDil)
app.use("/company/income", companyIncome)
app.use("/company/stastics", companyStastics)
app.use("/reservation", movieReservation)
app.use("/mem/point", memberPoint)

app.use("/memberView", memberView)
app.use("/question", question)
app.use("/platform", platform)
app.use("/memReview", memReview)

app.use("/", main)
app.use("/memLogin", memLogin)
app.use("/memJoin", memJoin)
app.use("/memFind", memFind)
app.use("/theater", theaterManage)
app.use("/theater/sales", theaterSales)
app.use("/theater/post", theaterPost)
app.use("/theater/stock", theaterStock)
app.use("/theater/emp", theaterEmp)
app.use("/theater/dil", theaterDil)
app.use("/theater/sal", theaterSalary)
app.use("/theater/sched", theaterSchedule)
app.use("/memBoard", memBoard)
app.use("/memInfo", memInfo)
app.use("/movieTicketing", movieTicketing)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// 실행
app.listen(port, () => console.log(`Server Started on port ${port}`))
module.exports = app
