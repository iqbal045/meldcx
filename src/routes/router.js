// File Route handlers
const fileRoutes = require('./fileRoutes');

const routes = [
  // file Routes
  {
    path: `/files`,
    handler: fileRoutes,
  },

  // Common Routes
  {
    path: '/', // root route
    handler: (req, res) => {
      res.status(200).json({
        message: 'Welcome to our App.',
        success: true,
        status: 200,
      });
    },
  },
  {
    path: '/*', // 404 response path
    handler: (req, res) => {
      res.status(404).json({
        message: `Error: 404, Url Not Found!`,
        success: false,
        status: 404,
      });
    },
  },
];

module.exports = app => {
  routes.forEach(r => {
    if (r.path === '/') {
      app.get(r.path, r.handler);
    } else {
      app.use(r.path, r.handler);
    }
  });
};
