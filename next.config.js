const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  webpack: (config) => {
    return config;
  },
};

module.exports = withAntdLess(nextConfig);
