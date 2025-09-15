import PropTypes from "prop-types";

export function ErrorMessage({
  error,
  onRetry,
  title = "Oups ! Une erreur s'est produite",
}) {
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        staggerChildren: 0.1,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const shakeVariants = {
    animate: {
      x: [0, -2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: 1,
        delay: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(220,53,69,0.3)",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
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
        <motion.div
          className="text-center p-5 rounded-4 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)",
            border: "2px solid rgba(220,53,69,0.1)",
            maxWidth: "500px",
          }}
          variants={shakeVariants}
          animate="animate"
        >
          {/* Icône d'erreur */}
          <motion.div
            className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
            style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
              boxShadow: "0 10px 25px rgba(220,53,69,0.2)",
            }}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.i
              className="bi bi-exclamation-triangle-fill text-white"
              style={{ fontSize: "2rem" }}
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          </motion.div>

          {/* Titre de l'erreur */}
          <motion.h3
            className="text-danger fw-bold mb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.5 },
            }}
          >
            {title}
          </motion.h3>

          {/* Message d'erreur */}
          <motion.div
            className="alert alert-danger d-inline-block mb-4"
            style={{
              background: "rgba(220,53,69,0.1)",
              border: "1px solid rgba(220,53,69,0.2)",
              borderRadius: "10px",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: 0.3, duration: 0.5 },
            }}
          >
            <motion.p
              className="mb-0 text-danger fw-medium"
              style={{ fontSize: "0.95rem" }}
            >
              <i className="bi bi-info-circle-fill me-2"></i>
              {error?.message || "Une erreur inattendue s'est produite"}
            </motion.p>
          </motion.div>

          {/* Bouton de retry si fourni */}
          {onRetry && (
            <motion.button
              className="btn btn-danger px-4 py-2 fw-bold rounded-pill"
              style={{
                background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                border: "none",
                boxShadow: "0 4px 15px rgba(220,53,69,0.2)",
              }}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              onClick={onRetry}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Réessayer
            </motion.button>
          )}

          {/* Message d'aide */}
          <motion.p
            className="text-muted mt-3 mb-0"
            style={{ fontSize: "0.85rem" }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.6, duration: 0.5 },
            }}
          >
            Si le problème persiste, veuillez rafraîchir la page ou contacter le
            support.
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  onRetry: PropTypes.func,
  title: PropTypes.string,
};
