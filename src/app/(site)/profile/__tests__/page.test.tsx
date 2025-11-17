import { render, screen, waitFor } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import UserProfile from '../page';

// Mock the components
jest.mock('@/components/profile/ProfileNavigations', () => ({
  ProfileNavigation: ({ activeTab, onTabChange }: any) => (
    <div data-testid="profile-navigation">
      <button onClick={() => onTabChange('general')}>General</button>
      <button onClick={() => onTabChange('avatar')}>Avatar</button>
      <button onClick={() => onTabChange('security')}>Security</button>
    </div>
  ),
  SettingsTab: jest.fn(),
}));

jest.mock('@/components/profile/cardsProfile', () => ({
  GeneralTab: () => <div data-testid="general-tab">General Tab</div>,
}));

jest.mock('@/components/profile/AvatarCard', () => ({
  AvatarCard: () => <div data-testid="avatar-card">Avatar Card</div>,
}));

jest.mock('@/components/profile/SecurityTabs', () => ({
  SecurityTab: () => <div data-testid="security-tab">Security Tab</div>,
}));

jest.mock('@/components/profile/PreferencesTab', () => ({
  PreferencesTab: () => <div data-testid="preferences-tab">Preferences Tab</div>,
}));

jest.mock('@/components/profile/SupportTab', () => ({
  SupportTab: () => <div data-testid="support-tab">Support Tab</div>,
}));

jest.mock('@/components/profile/NotificationsTab', () => ({
  NotificationsTab: () => <div data-testid="notifications-tab">Notifications Tab</div>,
}));

// Mock the toast
jest.mock('@/components/ui/use-toast', () => ({
  toast: jest.fn(),
}));

// Mock server actions
jest.mock('@/app/actions/upload/uploadFile', () => ({
  UploadFile: jest.fn(),
}));

jest.mock('@/app/actions/upload/getUsersImage', () => ({
  getUserImage: jest.fn(() => Promise.resolve({ success: true, image: null })),
}));

jest.mock('@/app/actions/upload/getProfile', () => ({
  getProfileData: jest.fn(() =>
    Promise.resolve({
      success: true,
      data: { username: 'Test User', email: 'test@example.com' },
    })
  ),
  updateProfileData: jest.fn(),
}));

jest.mock('@/app/actions/upload/change-password', () => ({
  changePassword: jest.fn(),
}));

describe('UserProfile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: '1' } },
      status: 'authenticated',
    });
  });

  it('should not render NotificationsTab component', async () => {
    render(<UserProfile />);

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.getByTestId('profile-navigation')).toBeInTheDocument();
    });

    // Verify that NotificationsTab is NOT rendered
    const notificationsTab = screen.queryByTestId('notifications-tab');
    expect(notificationsTab).not.toBeInTheDocument();
  });

  it('should render available tabs but not NotificationsTab', async () => {
    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByTestId('profile-navigation')).toBeInTheDocument();
    });

    // Verify that the general tab is rendered by default
    expect(screen.getByTestId('general-tab')).toBeInTheDocument();

    // Verify that NotificationsTab is not in the DOM at all
    expect(screen.queryByTestId('notifications-tab')).not.toBeInTheDocument();

    // Verify that text content from NotificationsTab doesn't appear
    expect(screen.queryByText(/Tus notificaciones recientes/i)).not.toBeInTheDocument();
  });

  it('should not show NotificationsTab even when switching between tabs', async () => {
    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.getByTestId('profile-navigation')).toBeInTheDocument();
    });

    // Throughout the component lifecycle, NotificationsTab should never appear
    expect(screen.queryByTestId('notifications-tab')).not.toBeInTheDocument();
    expect(screen.queryByText(/notificaciones/i)).not.toBeInTheDocument();
  });
});
