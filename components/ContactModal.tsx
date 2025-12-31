import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, User, MessageSquare } from 'lucide-react';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop & Container combined */}
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-auto"
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-white dark:bg-[#111] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-[#1a1a1a] dark:bg-black p-6 flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-serif text-white mb-1">Get in Touch</h3>
                                    <p className="text-gray-400 text-sm">Let's build something amazing together.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-8">
                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    {/* Name Input */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <User size={14} /> Name
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-[#A87E30] focus:ring-2 focus:ring-[#A87E30]/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Two column layout for Mobile & Email */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                <Phone size={14} /> Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-[#A87E30] focus:ring-2 focus:ring-[#A87E30]/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                <Mail size={14} /> Email ID
                                            </label>
                                            <input
                                                type="email"
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-[#A87E30] focus:ring-2 focus:ring-[#A87E30]/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Input */}
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <MessageSquare size={14} /> Message
                                        </label>
                                        <textarea
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:border-[#A87E30] focus:ring-2 focus:ring-[#A87E30]/20 outline-none transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-4 bg-[#A87E30] hover:bg-[#8f6b28] text-white rounded-xl font-semibold text-lg shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-colors mt-2"
                                    >
                                        <Send size={18} /> Send Message
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
