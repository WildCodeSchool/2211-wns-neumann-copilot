import { fireEvent, render, screen } from "@testing-library/react";
import Profil from "./Profil";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { GetProfileDocument } from "../gql/generated/schema";

// on mock, car on recupere des infos sur l'utilisateur depuis la BDD
const newUserProfileMock = {
    request: {
        query: GetProfileDocument,
    },
    result: {
        data: {
            profile: { id: "1", email: "test@test.com" },
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
            <MockedProvider>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );

        expect(await screen.findByText('Modifier')).toBeVisible();
    });

    it("should verify that a new user sees their email in the input", () => {
        render(
            <MockedProvider mocks={[newUserProfileMock]}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );
        const input = screen.getByTitle('email')
        fireEvent.change(input, { target: { value: newUserProfileMock.result.data.profile.email } })
        expect(input).toHaveValue('test@test.com');
    });

    it("should verify that a user sees their information after modifying it", () => {
        render(
            <MockedProvider mocks={[afterModifyProfileMock]}>
                <Profil />
            </MockedProvider>,
            { wrapper: BrowserRouter }
        );

        fireEvent.change(screen.getByTitle('email'), { target: { value: afterModifyProfileMock.result.data.profile.email } });
        fireEvent.change(screen.getByTitle('profileDescription'), { target: { value: afterModifyProfileMock.result.data.profile.profileDescription } });
        fireEvent.change(screen.getByTitle('firstName'), { target: { value: afterModifyProfileMock.result.data.profile.firstName } });
        fireEvent.change(screen.getByTitle('lastName'), { target: { value: afterModifyProfileMock.result.data.profile.lastName } });
        fireEvent.change(screen.getByTitle('age'), { target: { value: afterModifyProfileMock.result.data.profile.age } });

        expect(screen.getByTitle('email')).toHaveValue('test@test.com');
        expect(screen.getByTitle('profileDescription')).toHaveValue('salut tout le monde');
        expect(screen.getByTitle('firstName')).toHaveValue('Michel');
        expect(screen.getByTitle('lastName')).toHaveValue('Dupond');
        expect(screen.getByTitle('age')).toHaveValue('30');
    });
});