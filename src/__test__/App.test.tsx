import { render, screen } from '@testing-library/react'
import { App } from '../App'

it('renders Header, Content, and Footer', () => {
  render(<App />)
  
  // Header
  expect(screen.getByText('BROCCOLI & CO')).toBeInTheDocument()

  // Content
  expect(screen.getByText('A better way', { exact: false })).toBeInTheDocument()

  // Footer
  expect(screen.getByText('All rights reserved', { exact: false })).toBeInTheDocument()
})