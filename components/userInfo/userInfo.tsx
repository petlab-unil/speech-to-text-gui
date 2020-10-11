import React from "react";
import {User} from "../../types/user";
import {UserContainer} from "@components/userInfo/container";
import {TranslationContainer} from "@components/userInfo/translation";
import {SectionTitle, SubSectionTitle} from "@components/global/sectionTitle";

export const UserInfo = ({name, translations}: User) => {
    return <UserContainer>
        <SectionTitle>
            Welcome, {name}
            <br/>
            <SubSectionTitle>Your transcriptions</SubSectionTitle>
        </SectionTitle>
        {translations.map(tr => <TranslationContainer key={JSON.stringify(tr)} {...tr}/>)}
    </UserContainer>;
};