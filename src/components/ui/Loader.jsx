import React from 'react';
import { motion } from 'framer-motion';

export const Loader = ({ fullScreen = true, message = "Loading..." }) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 dark:bg-erp-dark-bg/80 backdrop-blur-sm"
    : "flex flex-col items-center justify-center w-full h-full min-h-[300px]";

  return (
    <div className={containerClasses}>
      <div className="relative w-20 h-20">
        {/* Outer Ring */}
        <motion.span
          className="absolute inset-0 block rounded-full border-4 border-transparent border-t-primary border-l-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle Ring */}
        <motion.span
          className="absolute inset-2 block rounded-full border-4 border-transparent border-t-secondary border-r-secondary opacity-75"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner Ring */}
        <motion.span
          className="absolute inset-4 block rounded-full border-4 border-transparent border-t-accent border-b-accent opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
        {/* Center dot */}
        <motion.span
          className="absolute inset-[35%] block rounded-full bg-primary"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 font-heading font-medium text-erp-heading dark:text-erp-dark-heading tracking-wide"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
