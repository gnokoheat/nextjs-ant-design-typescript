const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = withAntdLess(nextConfig);
