import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
// Composant Loader animé
export function LoadingSpinner({ message = "Chargement en cours..." }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.2, 1],
      opacity: [0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="d-flex flex-column align-items-center justify-content-center min-vh-50 p-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Cercle de fond pulsant */}
        <motion.div
          className="position-relative d-flex align-items-center justify-content-center mb-4"
          style={{
            width: "120px",
            height: "120px",
          }}
        >
          <motion.div
            className="position-absolute rounded-circle"
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(0,123,255,0.1) 0%, rgba(108,117,125,0.1) 100%)",
              border: "2px solid rgba(0,123,255,0.2)",
            }}
            variants={pulseVariants}
            animate="animate"
          />

          {/* Spinner principal */}
          <motion.div
            className="position-relative d-flex align-items-center justify-content-center"
            style={{
              width: "80px",
              height: "80px",
            }}
            variants={spinnerVariants}
            animate="animate"
          >
            <div
              className="rounded-circle"
              style={{
                width: "100%",
                height: "100%",
                border: "4px solid rgba(0,123,255,0.2)",
                borderTop: "4px solid #007bff",
                borderRadius: "50%",
              }}
            />
          </motion.div>

          {/* Points animés au centre */}
          <div className="position-absolute d-flex align-items-center justify-content-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-circle bg-primary mx-1"
                style={{
                  width: "8px",
                  height: "8px",
                }}
                variants={dotVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Message de chargement */}
        <motion.div
          className="text-center"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          <h4 className="text-primary fw-bold mb-2">{message}</h4>
          <motion.p
            className="text-muted mb-0"
            animate={{
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Veuillez patienter quelques instants...
          </motion.p>
        </motion.div>

        {/* Barre de progression animée */}
        <motion.div
          className="progress mt-4"
          style={{
            width: "200px",
            height: "4px",
            backgroundColor: "rgba(0,123,255,0.1)",
            borderRadius: "2px",
          }}
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: 1,
            width: "200px",
            transition: { delay: 0.5, duration: 0.6 },
          }}
        >
          <motion.div
            className="progress-bar bg-primary"
            style={{ borderRadius: "2px" }}
            animate={{
              x: ["-100%", "100%"],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
LoadingSpinner.propTypes = {
  message: PropTypes.string,
};
