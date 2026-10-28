import React from 'react';

interface SectionShellProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  /** Additional style overrides */
  style?: React.CSSProperties;
}

/**
 * Consistent section wrapper.
 * Applies standard vertical padding, horizontal padding, overflow, and z-index.
 */
export const SectionShell: React.FC<SectionShellProps> = ({
  children,
  id,
  className = '',
  dark = false,
  style,
}) => {
  return (
    <section
      id={id}
      className={`relative w-full px-5 sm:px-8 lg:px-12 overflow-hidden ${
        dark ? 'bg-ink text-white' : 'bg-paper text-ink'
      } ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default SectionShell;
