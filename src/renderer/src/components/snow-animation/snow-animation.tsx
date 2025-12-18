import { SnowContainer, Snowflake } from "./styled";

const SNOWFLAKE_COUNT = 150;

export const SnowAnimation = () => {
  const snowflakes = Array.from({ length: SNOWFLAKE_COUNT }).map((_, index) => {
    const left = `${Math.random() * 100}vw`;
    const animationDuration = `${Math.random() * 5 + 5}s`; // 5 to 10 seconds
    const animationDelay = `${Math.random() * 5}s`;
    const opacity = `${Math.random() * 0.7 + 0.3}`; // 0.3 to 1.0
    const size = `${Math.random() * 3 + 1}px`; // 1px to 4px

    return (
      <Snowflake
        key={index}
        left={left}
        animationDuration={animationDuration}
        animationDelay={animationDelay}
        opacity={opacity}
        size={size}
      />
    );
  });

  return <SnowContainer>{snowflakes}</SnowContainer>;
};
