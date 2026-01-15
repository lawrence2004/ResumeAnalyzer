import React from 'react';

export const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition ${className}`}
    >
      {children}
    </div>
  );
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles =
    'font-medium rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg',
    secondary:
      'bg-secondary-50 text-secondary-700 hover:bg-secondary-100',
    outline:
      'border-2 border-slate-300 text-slate-700 hover:bg-slate-50',
    danger:
      'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export const Badge = ({
  children,
  variant = 'info',
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-orange-100 text-orange-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 transition ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const TextArea = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full px-4 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-primary-500 transition resize-none ${
          error ? 'border-red-500' : ''
        } ${className}`}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
};

export const FileInput = React.forwardRef(
  ({ label, error, hint, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type="file"
            ref={ref}
            {...props}
            className="hidden"
            id={props.id || 'file-input'}
          />
          <label
            htmlFor={props.id || 'file-input'}
            className={`block px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-center cursor-pointer hover:border-primary-500 transition ${className}`}
          >
            <div className="text-slate-600">
              <div className="font-medium">
                Click to upload or drag and drop
              </div>
              {hint && (
                <div className="text-sm text-slate-500 mt-1">
                  {hint}
                </div>
              )}
            </div>
          </label>
        </div>
        {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
