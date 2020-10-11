import React, {useState} from "react";
import {Translation} from "../../types/user";
import Styled from "styled-components";
import {TranscriptionText} from "@components/transcriptionText";

const TranslationWrapper = Styled.div`
    width: calc(100% - 2px);
    margin: 20px 0;
    border: 1px solid white;
`;

const FileName = Styled.div`
    cursor: pointer;
`;

export const TranslationContainer = ({file_name, transcripts}: Translation) => {
    const [toggled, setToggled] = useState<boolean>(false);

    return <TranslationWrapper>
        <FileName onClick={() => setToggled(!toggled)}>{file_name}</FileName>
        {toggled && <TranscriptionText transcriptions={transcripts} />}
    </TranslationWrapper>;
};