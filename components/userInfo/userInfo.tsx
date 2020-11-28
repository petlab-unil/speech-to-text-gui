import React, {useState} from "react";
import {User} from "../../types/user";
import {UserContainer} from "@components/userInfo/container";
import {TranslationContainer} from "@components/userInfo/translation";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";
import {Api} from "../../services/api";

interface Props {
    user: User,
    api: Api,
    allAccounts: User[]
}

export const UserInfo = ({user, api, allAccounts}: Props) => {
    const [userState, setUser] = useState<User>(user);
    return <UserContainer>
        <SectionTitle>
            Welcome, {user.name}
            <br/>
            <SubSectionTitle>Your transcriptions</SubSectionTitle>
        </SectionTitle>
        {userState.translations.map(tr =>
            <TranslationContainer
                key={JSON.stringify(tr)}
                translationId={tr._id}
                name={tr.file_name}
                api={api}
                setUser={setUser}
                allAccounts={allAccounts}
            />)}
    </UserContainer>;
};