import { render, screen } from '@testing-library/react';
import { PlantCard } from './plant-card';
import { useTranslations } from 'next-intl';

// Mock the next-intl useTranslations hook
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace) => (key: string) => `${namespace}.${key}`),
}));

describe('PlantCard', () => {
  it('should not contain hardcoded strings and use translations', () => {
    // Mock the return value of useTranslations for the specific namespace
    (useTranslations as jest.Mock).mockReturnValue((key: string) => {
      if (key === 'plant.name') return 'Translated Plant Name';
      if (key === 'plant.status') return 'Translated Status';
      return `mocked.${key}`;
    });

    render(<PlantCard name="Test Plant" status="Healthy" imageUrl="/test.jpg" />);

    // Assert that the component renders translated text
    expect(screen.getByText('Translated Plant Name')).toBeInTheDocument();
    expect(screen.getByText('Translated Status')).toBeInTheDocument();

    // Assert that specific hardcoded strings are NOT present (example, adjust as needed)
    expect(screen.queryByText('Test Plant')).not.toBeInTheDocument();
    expect(screen.queryByText('Healthy')).not.toBeInTheDocument();
  });
});
