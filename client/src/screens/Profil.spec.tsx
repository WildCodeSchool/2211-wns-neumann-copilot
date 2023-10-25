import { fireEvent, render, screen } from "@testing-library/react";
import Profil from "./Profil";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { GetProfileDocument, GetUsersDocument } from "../gql/generated/schema";

// on mock, car on recupere des infos sur l'utilisateur depuis la BDD
const adminProfileMock = {
    request: {
        query: GetProfileDocument,
    },
    result: {
        data: {
            profile: { id: "1", email: "test@test.com" },
        },
    },
};

const undefinedProfileMock = {
    request: {
        query: GetProfileDocument,
    },
    result: {
        data: {
            profile: undefined,
        },
    },
};

const afterModifyProfileMock = {
    request: {
        query: GetProfileDocument,
    },
    result: {
        data: {
            profile: {
                id: "1",
                email: "test@test.com",
                profilePicture: "test.png",
                profileDescription: "salut tout le monde",
                firstName: "Michel",
                lastName: "Dupond",
                age: "30"
            },
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

    it("should test", () => {
        render(
            <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );
        const input = screen.getByTitle('email')
        fireEvent.change(input, { target: { value: adminProfileMock.result.data.profile.email } })
        expect(input).toHaveValue('test@test.com');
    });

    it("should test2", () => {
        render(
            <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );
        const input = screen.getByTitle('email')
        // fireEvent.change(input, { target: { value: adminProfileMock.result.data.profile.email } })
        expect(input).toHaveValue('');
    });

    // it("should test 3", () => {
    //     render(
    //         <MockedProvider mocks={[afterModifyProfileMock]} addTypename={false}>
    //             <Profil />
    //         </MockedProvider>,
    //         { wrapper: BrowserRouter }
    //     );
    //     const input = screen.getByTitle('email')
    //     fireEvent.change(input, { target: { value: afterModifyProfileMock.result.data.profile.email } })
    //     expect(input).toHaveValue('');
    // });

    // it("should look for text in the input", () => {
    //     render(
    //         <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
    //             <Profil />
    //         </MockedProvider>,
    //         { wrapper: BrowserRouter }
    //     );

    //     expect(screen.getByTestId('email')).toHaveAttribute('id', 'email');
    // });

    // it("should look for text in the input with undefined current user", () => {
    //     render(
    //         <MockedProvider mocks={[undefinedProfileMock]} addTypename={false}>
    //             <Profil />
    //         </MockedProvider>,
    //         { wrapper: BrowserRouter }
    //     );

    //     expect(screen.getByDisplayValue('')).toHaveAttribute('id', 'email');
    // });

    // it("should look for text in the input after user has modify his informations", () => {
    //     render(
    //         <MockedProvider mocks={[afterModifyProfileMock]} addTypename={false}>
    //             <Profil />
    //         </MockedProvider>,
    //         { wrapper: BrowserRouter }
    //     );

    //     expect(screen.getByDisplayValue('test@test.com')).toHaveAttribute('id', 'email');
    //     expect(screen.getByDisplayValue('salut tout le monde')).toHaveAttribute('id', 'description');
    //     expect(screen.getByDisplayValue('Michel')).toHaveAttribute('id', 'firstName');
    //     expect(screen.getByDisplayValue('Dupond')).toHaveAttribute('id', 'lastName');
    //     expect(screen.getByDisplayValue('30')).toHaveAttribute('id', 'age');
    // });
});