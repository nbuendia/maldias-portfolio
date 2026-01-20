import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_S_ID: process.env.REACT_APP_S_ID,
    REACT_APP_T_ID: process.env.REACT_APP_T_ID,
    REACT_APP_P_KEY: process.env.REACT_APP_P_KEY,
  },
};

export default nextConfig;
