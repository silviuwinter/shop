export interface PassportOauth_userInterface {
    id: string;
    emails: string[];
    userId: string;
    name: {
        familyName: string;
        givenName: string;
    };
    username: string;
    displayName: string;
    provider: string;
}
