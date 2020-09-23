export const scrollbar = `
::-webkit-scrollbar {
    width: 9px;
    height: 9px;
}
::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
}
::-webkit-scrollbar-thumb {
    background: #3d464d;
    border: 1px none #ffffff;
    border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
    background: #5a6a77;
}
::-webkit-scrollbar-thumb:active {
    background: #52606b;
}
::-webkit-scrollbar-track {
    background: #666666;
    border: 2px none #ffffff;
    border-radius: 37px;
}
::-webkit-scrollbar-track:hover {
    background: #666666;
}
::-webkit-scrollbar-track:active {
    background: #666666;
}
::-webkit-scrollbar-corner {
    background: transparent;
}
`;