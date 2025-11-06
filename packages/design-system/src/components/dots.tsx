import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: '-100%',
  },
  end: {
    y: '25%',
  },
};

interface Props {
  color?: 'bg-grey-light' | 'bg-grey-medium';
}

export function Dots({ color = 'bg-grey-medium' }: Props) {
  return (
    <motion.div
      className="flex items-center justify-between gap-0.5"
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        className={`block h-1 w-1 rounded-full ${color}`}
        variants={loadingCircleVariants}
        transition={{
          duration: 0.225,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.span
        className={`block h-1 w-1 rounded-full ${color}`}
        variants={loadingCircleVariants}
        transition={{
          duration: 0.225,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
      <motion.span
        className={`block h-1 w-1 rounded-full ${color}`}
        variants={loadingCircleVariants}
        transition={{
          duration: 0.225,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: 'reverse',
        }}
      />
    </motion.div>
  );
}
