import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from 'react-router-dom';
import { GetUsersDocument } from "../gql/generated/schema";
import Home from './Home';

// on mock, car on recupere des infos sur l'utilisateur depuis la BDD
const adminProfileMock = {
  request: {
    query: GetUsersDocument,
  },
  result: {
    data: {
      profile: { id: "1", email: "test@test.com" },
    },
  },
};

describe("App component", () => {
  it("should", async () => {
    render(
      <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
        <Home />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    
    expect(await screen.findByText('Bienvenue chères Copilote !')).toBeVisible();
  });
});