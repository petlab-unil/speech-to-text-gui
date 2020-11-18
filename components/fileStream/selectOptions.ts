import {SelectOptions} from "@components/fileStream/select";

export const audioTypes: SelectOptions[] = [
    {
        value: 0,
        text: "ENCODING_UNSPECIFIED"
    },
    {
        value: 1,
        text: "LINEAR16"
    },
    {
        value: 2,
        text: "FLAC"
    },
    {
        value: 3,
        text: "MULAW"
    },
    {
        value: 4,
        text: "AMR"
    },
    {
        value: 5,
        text: "AMR_WB"
    },
    {
        value: 6,
        text: "OGG_OPUS"
    },
    {
        value: 7,
        text: "SPEEX_WITH_HEADER_BYTE"
    },
];

export const modelOptions: SelectOptions[] = [
    {
        value: "default",
        text: "Default"
    },
    {
        value: "phone_call",
        text: "Phone Call"
    },
    {
        value: "video",
        text: "Video"
    },
    {
        value: "command_and_search",
        text: "Command and search"
    },
];

export const languageOptions: SelectOptions[] = [
    {
        value: "fr-FR",
        text: "French"
    },
    {
        value: "en-US",
        text: "English"
    },
];