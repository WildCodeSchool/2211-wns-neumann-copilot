import { render, screen } from "@testing-library/react";
import Profil from "./Profil";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { GetUsersDocument } from "../gql/generated/schema";

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

const undefinedProfileMock = {
    request: {
        query: GetUsersDocument,
    },
    result: {
        data: {
            profile: undefined,
        },
    },
};

describe("Profil component", () => {
    it("should look for text in the screen", async () => {
        render(
            <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );

        expect(await screen.findByText('Modifier')).toBeVisible();
    });

    it("should look for text in the input", () => {
        render(
            <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );

        expect(screen.getByDisplayValue('test@test.com')).toHaveAttribute('id', 'email');
    });

    it("should look for text in the input with undefined current user", () => {
        render(
            <MockedProvider mocks={[undefinedProfileMock]} addTypename={false}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );

        expect(screen.getByDisplayValue('')).toHaveAttribute('id', 'email');
    });
});