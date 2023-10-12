import { render, screen } from '@testing-library/react';
import App from './App';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
describe('App', () => {
  it('renders LandingPage for the / route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // Assuming LandingPage has unique text content
    expect(screen.getByText('Spend2Save')).toBeInTheDocument();
  });

  it('renders MakePayment for the /pay route', () => {
    render(
      <BrowserRouter initialEntries={['/pay']}>
        <App />
      </BrowserRouter>
    );
    // Assuming MakePayment has unique text content
    expect(screen.getByText('Payment Interface')).toBeInTheDocument();
  });

  // Add more test cases for other routes similarly
  // Example:
  // it('renders Login for the /login route', () => {
  //   render(
  //     <BrowserRouter initialEntries={['/login']}>
  //       <App />
  //     </BrowserRouter>
  //   );
  //   // Assuming Login has unique text content
  //   expect(screen.getByText('Login Content')).toBeInTheDocument();
  // });

  // Add more test cases for other routes as needed
});
