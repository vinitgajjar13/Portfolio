import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView, Variants } from 'framer-motion';

interface ScrollFloatProps {
    children: string | React.ReactNode;
    className?: string;
    containerClassName?: string;
    animationDuration?: number;
    // Delay between words
    ease?: string | number[];
    stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
    children,
    className = "",
    containerClassName = "",
    animationDuration = 1,
    ease = [0.22, 1, 0.36, 1], // Standard cubic bezier for smooth float
    stagger = 0.05
}) => {
    // If children is not a simple string, we might just wrap it or handle recursively
    // For this specific 'text float' effect, we assume 'children' is a string we want to split.
    // If it's rich text, we might need a different approach, but let's handle string primarily.

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    const text = typeof children === 'string' ? children : '';
    // Split by space but preserve spaces? 
    // Easier: split by space, join with non-breaking space, or just render spans with mr-x
    const words = text.split(" ");

    // If children wasn't a string, just render it normally inside the animation (less "floaty" per word but still works)
    if (!text) {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: animationDuration, ease }}
                className={containerClassName}
            >
                {children}
            </motion.div>
        )
    }

    return (
        <motion.div
            ref={ref}
            className={`inline-block ${containerClassName}`} // Use inline-block or block depending on need
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            <span className="sr-only">{text}</span>
            {words.map((word, i) => (
                <span key={i} className={`inline-block overflow-hidden align-top ${className}`}>
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "100%", opacity: 0 },
                            visible: {
                                y: 0,
                                opacity: 1,
                                transition: {
                                    duration: animationDuration,
                                    ease: ease,
                                    delay: i * stagger
                                }
                            }
                        }}
                    >
                        {word}
                        {/* Add a space after word unless it's the last one, but ensure space is inside the line logic or outside? 
                 Usually easier to put the space character in a span or just margin.
                 Using unicode space is safer for exact layout reproduction.
             */}
                        <span className="inline-block">&nbsp;</span>
                    </motion.span>
                </span>
            ))}
        </motion.div>
    );
};

export default ScrollFloat;
