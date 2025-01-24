const models = require('../models');

const homePage = async (req, res) => res.render('app');

const mapPage = async (req, res) => res.render('map');

module.exports = {
  homePage,
  mapPage
};
