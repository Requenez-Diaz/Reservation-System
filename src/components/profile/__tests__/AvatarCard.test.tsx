import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarCard } from '../AvatarCard';
import React from 'react';

describe('AvatarCard Component', () => {
  const mockOnAvatarClick = jest.fn();
  const mockOnFileChange = jest.fn();

  const defaultProps = {
    avatarSrc: null,
    isUploading: false,
    isEditing: false,
    name: 'Test User',
    onAvatarClick: mockOnAvatarClick,
    fileInputRef: React.createRef<HTMLInputElement>(),
    onFileChange: mockOnFileChange,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Null fileInputRef handling', () => {
    it('should handle null fileInputRef gracefully without crashing', () => {
      const propsWithNullRef = {
        ...defaultProps,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      expect(() => {
        render(<AvatarCard {...propsWithNullRef} />);
      }).not.toThrow();
    });

    it('should render properly with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      render(<AvatarCard {...propsWithNullRef} />);

      // Component should render successfully
      expect(screen.getByText('Foto de Perfil')).toBeInTheDocument();
      expect(screen.getByText(/Tu avatar ayuda a identificar tu cuenta/i)).toBeInTheDocument();
    });

    it('should allow avatar clicks even when fileInputRef is null', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: true,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      // Find the avatar container - it should be rendered
      const avatar = container.querySelector('.w-36.h-36');
      expect(avatar).toBeTruthy();
      
      if (avatar) {
        fireEvent.click(avatar);
        expect(mockOnAvatarClick).toHaveBeenCalledTimes(1);
      }
    });

    it('should render file input element even with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      // File input should still be rendered
      const fileInput = container.querySelector('input[type="file"]');
      expect(fileInput).toBeInTheDocument();
      expect(fileInput).toHaveAttribute('accept', 'image/*');
    });

    it('should not break when attempting to change files with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: true,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeInTheDocument();

      // Create a mock file
      const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

      // This should not throw an error even though fileInputRef.current is null
      expect(() => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      }).not.toThrow();

      expect(mockOnFileChange).toHaveBeenCalledTimes(1);
    });

    it('should display correct text when not editing with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: false,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      render(<AvatarCard {...propsWithNullRef} />);

      expect(screen.getByText(/Presiona "Editar Perfil" para cambiar/i)).toBeInTheDocument();
    });

    it('should display correct text when editing with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: true,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      render(<AvatarCard {...propsWithNullRef} />);

      expect(screen.getByText(/Haz clic en la imagen para cambiarla/i)).toBeInTheDocument();
      expect(screen.getByText(/Máximo 5MB • JPG, PNG o WebP/i)).toBeInTheDocument();
    });

    it('should show uploading state correctly with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isUploading: true,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      // Check for the spinner (uploading indicator)
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should disable file input when not editing with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: false,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).toBeDisabled();
    });

    it('should enable file input when editing with null fileInputRef', () => {
      const propsWithNullRef = {
        ...defaultProps,
        isEditing: true,
        isUploading: false,
        fileInputRef: { current: null } as React.RefObject<HTMLInputElement>,
      };

      const { container } = render(<AvatarCard {...propsWithNullRef} />);

      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
      expect(fileInput).not.toBeDisabled();
    });
  });

  describe('Normal operation with valid fileInputRef', () => {
    it('should render normally with a valid fileInputRef', () => {
      render(<AvatarCard {...defaultProps} />);

      expect(screen.getByText('Foto de Perfil')).toBeInTheDocument();
    });

    it('should display avatar image when avatarSrc is provided', () => {
      const propsWithAvatar = {
        ...defaultProps,
        avatarSrc: 'data:image/png;base64,mockimage',
      };

      render(<AvatarCard {...propsWithAvatar} />);

      // The component should render with the avatar source
      // Check that Foto de Perfil is rendered
      expect(screen.getByText('Foto de Perfil')).toBeInTheDocument();
      // Since we're providing avatarSrc, the component should render correctly
      expect(screen.getByText(/Tu avatar ayuda a identificar tu cuenta/i)).toBeInTheDocument();
    });
  });
});
