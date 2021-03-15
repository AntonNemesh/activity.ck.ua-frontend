const webpack = require('webpack')
require('dotenv').config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'ACCESS_CREDENTIALS': {
        FIREBASE_OPTIONS: JSON.stringify(process.env.FIREBASE_OPTIONS),
      }
    })
  ]
};

