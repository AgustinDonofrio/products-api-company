"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _initialSetup = require("./libs/initialSetup.js");
var _productsRoutes = _interopRequireDefault(require("./routes/products.routes.js"));
var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));
var _usersRoutes = _interopRequireDefault(require("./routes/users.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
(0, _initialSetup.createRoles)();
app.set('pkg', _package["default"]);

// middlewares
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());

// routes
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  });
});
app.use('/api/products', _productsRoutes["default"]);
app.use('/api/auth', _authRoutes["default"]);
app.use('/api/users', _usersRoutes["default"]);
var _default = exports["default"] = app;