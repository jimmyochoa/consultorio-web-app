var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var specialtyAreaRoutes = require("./app/specialtyAreas/routes/specialtyAreaRoutes");
var doctorRoutes = require("./app/doctors/routes/doctorRoutes");
var authRoutes = require("./app/auth/routes/authRoutes");
var patientRoutes = require("./app/patients/routes/patientRoutes");
var appointmentRoutes = require("./app/appointments/routes/appointmentRoutes");
var prescriptionRoutes = require("./app/prescriptions/routes/prescriptionRoutes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/specialty-areas", specialtyAreaRoutes);
app.use("/doctors", doctorRoutes);
app.use("/", authRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/prescriptions", prescriptionRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    // Solo muestra detalles si estás en desarrollo
    ...(req.app.get("env") === "development" && { error: err }),
  });
});

module.exports = app;
