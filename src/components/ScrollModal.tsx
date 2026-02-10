"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ScrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "love" | "friend";
}

export default function ScrollModal({ isOpen, onClose, variant = "love" }: ScrollModalProps) {
  const isLove = variant === "love";
  const bgColor = isLove ? "bg-rose-50" : "bg-amber-50";
  const borderColor = isLove ? "border-rose-300" : "border-amber-300";
  const textColor = isLove ? "text-rose-900" : "text-amber-900";
  const accentColor = isLove ? "text-rose-600" : "text-amber-600";
  const buttonBg = isLove ? "bg-rose-500 hover:bg-rose-600" : "bg-amber-500 hover:bg-amber-600";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`${bgColor} ${borderColor} border-2 rounded-2xl shadow-2xl max-w-md w-full p-8 text-center`}
            >
              {/* Heart Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 10 }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl font-serif ${accentColor} mb-3`}
              >
                Wait a moment! 
              </motion.h3>

              {/* Message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`${textColor} text-lg font-script leading-relaxed mb-6`}
              >
                You haven't opened the letter yet! 
                <br />
                <span className="text-base opacity-80">
                  Please tap on the envelope above to read it first
                </span>
              </motion.p>

              {/* Button */}
              <motion.button
                style={{ padding: "10px 30px", margin:"10px 0" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className={`${buttonBg} text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg`}
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
