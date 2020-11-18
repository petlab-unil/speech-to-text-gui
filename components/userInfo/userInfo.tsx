import React from "react";
import {User} from "../../types/user";
import {UserContainer} from "@components/userInfo/container";
import {TranslationContainer} from "@components/userInfo/translation";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";
import {Api} from "../../services/api";

interface Props {
    user: User,
    api: Api
}

export const UserInfo = ({user, api}: Props) => {
    return <UserContainer>
        <SectionTitle>
            Welcome, {user.name}
            <br/>
            <SubSectionTitle>Your transcriptions</SubSectionTitle>
        </SectionTitle>
        {user.translations.map(tr =>
            <TranslationContainer key={JSON.stringify(tr)} translationId={tr._id} name={tr.file_name} api={api}/>)}
    </UserContainer>;
};